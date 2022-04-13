import "~/styles/base.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand, sans-serif",
  },
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: "Quicksand, sans-serif",
          fontSize: "1.5rem",
        },
      },
    },
  },
})

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
