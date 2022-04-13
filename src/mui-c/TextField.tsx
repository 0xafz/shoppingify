import styled from "@mui/system/styled"
import { TextField } from "@mui/material"

const CTextField = styled(TextField)({
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
})

export default CTextField
