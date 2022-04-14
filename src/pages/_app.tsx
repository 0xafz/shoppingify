import "~/styles/base.css"
import { ThemeProvider } from "@mui/material/styles"
import theme from "~/lib/mui-theme"

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
