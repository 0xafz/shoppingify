import { createTheme, responsiveFontSizes } from "@mui/material/styles"

let theme = createTheme({
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

theme = responsiveFontSizes(theme)

export default theme
