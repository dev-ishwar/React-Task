import React, { useEffect } from "react";

import { Dialog } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { Button } from "@mui/material";

//Login error component
const LoginError = (props) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(!open);
  }, [!props.flag]);

  const handleToClose = () => {
    setOpen(false);
    props.resetValidity(null);
  };

  return (
    <Dialog open={open} onClose={handleToClose}>
      <DialogTitle>{"Email or Password is not valid!!"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Password should be numeric, upto 4 digit long and sum of digits should
          be 10.!
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
