import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./pages/Users";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token") && restricted) {
          return <Redirect to="/users" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <PrivateRoute restricted={false} component={Users} path="/users" exact />
      <PrivateRoute
        restricted={false}
        component={UserDetails}
        path="/users/:id"
        exact
      />

      <PublicRoute restricted={true} component={Login} path="/login" exact />
      <Redirect to="/login" />
      
    </Switch>
  );
};

export default Routes;
