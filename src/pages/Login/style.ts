import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  wrapper: {
    maxWidth: "412px",
    width: "100%",
    margin: "0 auto",
  },
  paper: {
    marginTop: "40px",
  },
  form: {
    width: "100%",
  },
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto"
  },
}));

export default useStyles;
