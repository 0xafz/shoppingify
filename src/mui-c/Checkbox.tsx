import styled from "@mui/system/styled";
import Checkbox from "@mui/material/Checkbox";

export const C_Checkbox = styled(Checkbox)({
  "& .MuiSvgIcon-root": { fontSize: 28 },
  color: "var(--clr-amber11)",
  "&.Mui-checked": {
    color: "var(--clr-amber10)",
  },
});
