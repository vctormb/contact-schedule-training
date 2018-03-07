import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, } from "react-router-dom";

const PrivateRoute = ({ component: Component, authorized, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (authorized) {
        // TODO: create roles here
        return <Component {...props} />;
      } else {
        return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      }
    }
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
}

export default PrivateRoute;