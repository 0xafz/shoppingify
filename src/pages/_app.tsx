import "~/styles/base.css"
import { ThemeProvider } from "@mui/material/styles"
import theme from "~/lib/mui-theme"
import { useStore } from "~/zustand"
import cfetch from "~/lib/cfetch"
import useIsomorphicLayoutEffect from "~/hooks/useIsomorphicLayoutEffect"
import SEO from "~/components/SEO"

function App({ Component, pageProps }) {
  const setUser = useStore((state) => state.setUser)

  // See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
  useIsomorphicLayoutEffect(() => {
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
  })
  return (
    <ThemeProvider theme={theme}>
      <SEO />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
