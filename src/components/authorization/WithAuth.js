import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter, } from "react-router-dom";

import { checkUserLoggedIn } from '../../redux/auth/actions';

class WithAuth extends Component {
  state = {
    role: {
      authorized: false,
      isLoading: true,
    }
  }

  componentDidUpdate(prevProps) {
    const props = this.props;

    if (props.location !== prevProps.location) {
      this.checkUserLoggedIn();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.authReducer.loggedUser.data).length) {
      this.checkRouteRoles(nextProps.authReducer.loggedUser.data);
    }
  }

  checkUserLoggedIn() {
    const { dispatch, } = this.props;

    dispatch(checkUserLoggedIn());
  }

  checkRouteRoles(loginData) {
    const props = this.props;

    if (props.roles) {
      const isAuthorized = props.roles.some(x => x === loginData.role);

      this.setAuthorizedRole(isAuthorized);
    } else {
      console.log('no props.roles')
      this.setAuthorizedRole(true);
    }
  }

  setAuthorizedRole(status) {
    this.setState({
      role: {
        authorized: status,
        isLoading: false,
      }
    });
  }

  render() {
    const props = this.props;
    const state = this.state;

    const auth = {
      state: { ...state },
      reducer: { ...props.authReducer },
    };

    console.log('withAuth')

    return this.props.children(auth)
  }
}

function mapStateToProps(state) {
  return {
    authReducer: state.auth,
  }
}

WithAuth.propTypes = {
  children: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps)(WithAuth));