import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./pages/Users";
import Login from "./pages/Login";

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/users" exact component={Users} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Routes;
