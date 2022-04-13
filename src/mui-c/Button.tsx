import { Button } from "@mui/material"
import styled from "@mui/system/styled"

const CButton = styled(Button)({
  textTransform: "none",
  borderRadius: "1.2rem",
  backgroundColor: "var(--clr-amber10)",
  color: "var(--clr-white)",
  fontSize: "1.4rem",
  "&:hover": {
    backgroundColor: "var(--clr-amber11)",
  },
})

export default CButton
