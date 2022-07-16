import React, { useEffect } from "react";

import { Dialog } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { Button } from "@mui/material";

//Login error component
const LoginError = ({ flag, resetValidity }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(() => !open);
  }, [!flag]);

  const handleToClose = () => {
    setOpen(false);
    resetValidity(null);
  };

  return (
    <Dialog open={open} onClose={handleToClose}>
      <DialogTitle>{"Email or Password is not valid!!"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Password must be numeric, upto 4 digits long and sum of digits must be
          10!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginError;
