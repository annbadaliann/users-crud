import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  card: {
    padding: "20px",
    width: "500px",
    margin: "0 auto",
    display: "flex",
    boxShadow: "0 0 10px #ccc",
  },
  avatar: {
    width: "100px",
    height: "100px",
    marginRight: "20px",
  },
  goBack: {
    display: "flex",
    cursor: "pointer",
  },
}));

export default useStyles;
