import Button from "@mui/material/Button"
import styled from "@mui/system/styled"
import theme from "~/lib/mui-theme"

export const CButton = styled(Button)({
  textTransform: "none",
  borderRadius: "1.2rem",
  backgroundColor: "var(--clr-amber10)",
  color: "var(--clr-white)",
  fontSize: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
  "&:hover": {
    backgroundColor: "var(--clr-amber11)",
  },
})
export const TextButton = styled(CButton)({
  color: "var(--clr-black)",
  backgroundColor: "var(--clr-white)",
  "&:hover": {
    backgroundColor: "var(--clr-gray1)",
  },
})
export const RedButton = styled(CButton)({
  backgroundColor: "var(--clr-red10)",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "var(--clr-red11)",
  },
})

export const SkyButton = styled(CButton)({
  background: "var(--clr-sky10)",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "var(--clr-sky11)",
  },
})
