import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./pages/Users";
// import UserDetails from "./pages/UserDetails";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/users" exact component={Users} />
      <Route path="/users/:id" exact component={UserDetails} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Routes;
