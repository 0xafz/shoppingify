import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CloseIcon } from "~/components/icons";
import { RedButton, TextButton } from "./Button";
import { ReactNode, useState } from "react";

interface ConfirmDialogProps {
  open: boolean;
  children: ReactNode;
  onYes: (...args: any) => void;
  onClose: () => void;
  onYesLoading: boolean;
}
export const ConfirmDialog = ({
  open,
  children,
  onYes,
  onClose,
  onYesLoading,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      keepMounted
      open={open}
      onClose={onClose}
      sx={{
        fontSize: "1.8rem",
        "& .MuiDialog-paper": {
          borderRadius: "1.2rem",
        },
        "& .MuiDialogContent-root": {
          padding: "3rem",
        },
        "& .MuiDialogActions-root": {
          padding: "3rem",
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "1.8rem" }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 14,
            top: 8,
            color: "var(--clr-gray11)",
          }}
          data-cy="closeConfirmDialog"
        >
          <CloseIcon fontSize={"2rem"} />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <TextButton
          variant="text"
          autoFocus
          onClick={onClose}
          disabled={onYesLoading}
          data-cy="cancelAction"
        >
          cancel
        </TextButton>
        <RedButton onClick={onYes} disabled={onYesLoading} variant="contained" data-cy="confirmAction">
          {onYesLoading ? "processing..." : "Yes"}
        </RedButton>
      </DialogActions>
    </Dialog>
  );
};
