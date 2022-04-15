import Button from "@mui/material/Button"
import styled from "@mui/system/styled"

export const CButton = styled(Button)({
  textTransform: "none",
  borderRadius: "1.2rem",
  backgroundColor: "var(--clr-amber10)",
  color: "var(--clr-white)",
  fontSize: "1.4rem",
  "&:hover": {
    backgroundColor: "var(--clr-amber11)",
  },
})
export const RedButton = styled(CButton)({
  background: "var(--clr-red10)",
  fontSize: "1.5rem",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "var(--clr-red11)",
  },
})

export default CButton
