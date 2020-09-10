import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

const ProtectedRoute = ({ component: Component, condition, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (condition) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/home" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
