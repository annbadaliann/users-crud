import { Dialog, DialogContent, IconButton, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minWidth: 320, // TODO
    position: "relative",
    height: "auto",
    zIndex: 1,

    "@media (max-width:768px)": {
      padding: "5px !important",
      minWidth: "unset",
    },
  },
  closeButton: {
    position: "absolute",
    right: 4,
    top: 4,
    zIndex: 9,
  },
  dialogTitle: {
    textAlign: "center",
    color: theme.palette.text.primary,
    fontSize: 18,
    paddingTop: "15px",
  },
  dialogPaper: {
    backgroundColor: theme.palette.common.white,
  },
  closeIcon: {
    position: "absolute !important",
    right: "5px",
    top: "5px"
  },
}));

const TcDialog = ({
  open,
  maxWidth,
  padding,
  children,
  fullWidth,
  title,
  handleClose,
  ...other
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      fullWidth={fullWidth}
      {...other}
      PaperProps={{ style: { maxWidth, padding } }}
      classes={{ paper: classes.dialogPaper }}
    >
      {title && <h4 className={classes.dialogTitle}>{title}</h4>}
      <IconButton
        aria-label="close"
        onClick={handleClose}
        className={classes.closeIcon}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent className={classes.dialog} style={{ padding }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default TcDialog;
