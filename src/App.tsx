import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider as StoreProvider } from "react-redux";
import { SnackbarProvider } from "notistack";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import store from "./store";
import Routes from "./Routes";

import MainLayout from "./layout/MainLayout";

import NormalizeStyles from "./styles/normalize.js";
import { theme } from "./styles/theme";

const history = createBrowserHistory();

const App = (): JSX.Element => {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <SnackbarProvider>
          <NormalizeStyles />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router history={history}>
              <MainLayout>
                <Routes />
              </MainLayout>
            </Router>
          </ThemeProvider>
        </SnackbarProvider>
      </div>
    </StoreProvider>
  );
};

export default App;
