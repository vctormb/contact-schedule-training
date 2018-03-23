import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from "react-router-dom";

import WithAuth from './WithAuth'

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={routeProps => {
      return (
        <WithAuth roles={roles}>
          {auth => {
            if (auth.reducer.checkUserLoggedIn.isLoading || auth.reducer.login.isLoggedIn) {
              if (auth.state.role.isLoading || auth.state.role.authorized) {
                return <Component {...routeProps} />
              } else {
                return <Redirect to={{ pathname: '/not-found' }} />
              }
            } else {
              return <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />
            }
          }}
        </WithAuth>
      )

    }}

  />

);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
}

export default PrivateRoute;