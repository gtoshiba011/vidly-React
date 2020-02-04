import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({
  path,
  redirectPath,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      // path={path} // can be removed
      render={props => {
        if (!auth.getCurrentUser()) return <Redirect to={redirectPath} />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
