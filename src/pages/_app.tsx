import "~/styles/base.css"
import { ThemeProvider } from "@mui/material/styles"
import theme from "~/lib/mui-theme"
import { useStore } from "~/zustand"
import cfetch from "~/lib/cfetch"
import { useEffect, useLayoutEffect, useState } from "react"

function App({ Component, pageProps }) {
  const [loadUser, setLoadUser] = useState(false)

  // Wait until after client-side hydration to show
  useEffect(() => {
    setLoadUser(true)
  }, [])
  return (
    <ThemeProvider theme={theme}>
      {loadUser && <LoadInitialUser />}
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
const LoadInitialUser = () => {
  const setUser = useStore((state) => state.setUser)

  // read about `useLayoutEffect`: https://kentcdodds.com/blog/useeffect-vs-uselayouteffect#uselayouteffect
  useLayoutEffect(() => {
    // to avoid state updates after component unmount
    // see: https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
    let isActive = true
    try {
      ;(async () => {
        const userResult = await cfetch("/api/users/me", {
          method: "GET",
        })
        if (isActive) setUser(userResult.data)
      })()
    } catch (err) {
      console.error(err)
    }
    return () => {
      isActive = false
    }
  }, [setUser])
  return <></>
}

export default App
