import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function MessageBox({
  title,
  message,
  actionName,
  openDialog,
  actionLinkMethod,
}) {
  const [open, setOpen] = React.useState(openDialog);

  const handleClose = () => {
    setOpen(false);
    actionLinkMethod();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          {actionName}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
