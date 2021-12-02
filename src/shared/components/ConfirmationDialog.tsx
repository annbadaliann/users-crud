import { Box } from "@mui/system";
import React from "react";
import McButton from "./Button";
import TcDialog from "./Dialog";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  cancelBtn: {
    marginRight: "15px !important",
  },
  actionsSide: {
      marginTop: "40px",
  }
}));

const ConfirmationDialog = ({ open, cancelAction, confirmAction }) => {
  const classes = useStyles();

  return (
    <TcDialog open={open} title="Delete">
      <p> description="Are you sure...."</p>
      <div className={classes.actionsSide}>
        <McButton
          variant="outlined"
          width="140px"
          className={classes.cancelBtn}
          onClick={cancelAction}
        >
          Cancel
        </McButton>
        <McButton width="140px" onClick={confirmAction}>
          Confirm
        </McButton>
      </div>
    </TcDialog>
  );
};

export default ConfirmationDialog;
