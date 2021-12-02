import McButton from "./Button";
import TcDialog from "./Dialog";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  cancelBtn: {
    marginRight: "15px !important",
  },
  actionsSide: {
    marginTop: "40px",
  },
}));

interface IConfirmationDialogProps {
  open: boolean;
  title: string;
  description: string;
  cancelAction: () => void;
  confirmAction: () => void;
}
const ConfirmationDialog = ({
  open,
  title,
  description,
  cancelAction,
  confirmAction,
}: IConfirmationDialogProps) => {
  const classes = useStyles();

  return (
    <TcDialog open={open} title={title} handleClose={cancelAction}>
      <p>{description}</p>
      <div className={classes.actionsSide}>
        <McButton
          variant="outlined"
          width="140px"
          className={classes.cancelBtn}
          clickHandler={cancelAction}
        >
          Cancel
        </McButton>
        <McButton width="140px" clickHandler={confirmAction}>
          Confirm
        </McButton>
      </div>
    </TcDialog>
  );
};

export default ConfirmationDialog;
