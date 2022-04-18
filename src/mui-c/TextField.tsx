import styled from "@mui/system/styled"
import TextField from "@mui/material/TextField"
import theme from "~/lib/mui-theme"

const CTextField = styled(TextField)({
  minWidth: "18rem",
  maxWidth: "40rem",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    "& .MuiInputBase-root": {
      width: "100%",
    },
    "& input": {
      padding: "1rem .8rem",
    },
  },
  "& .MuiInputBase-root": {
    font: "inherit",
    fontSize: "1.5rem",
    fontWeight: "500",
    borderRadius: "1.2rem",
  },
  "& .MuiInputBase-input": {
    "&:hover ~ fieldset": {
      borderColor: "var(--clr-amber10)",
    },
    "&:focus ~ fieldset": {
      borderColor: "var(--clr-amber10)",
    },
  },
  "& label.Mui-focused": {
    color: "var(--clr-amber10)",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "1.5rem",
  },
})

export default CTextField
