import { useHistory } from "react-router-dom";

import Container from "@mui/material/Container";
import { IconButton, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Logo from "../../assets/images/logo.png";
import { Box } from "@mui/system";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: theme.palette.common.white,
    height: "60px",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "200px",
  },
}));

const Header = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/login')
  }

  return (
    <header className={classes.header}>
      <Container>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={logout}>
            <ExitToAppIcon color="primary"/>
          </IconButton>
        </Box>
      </Container>
    </header>
  );
};

export default Header;
