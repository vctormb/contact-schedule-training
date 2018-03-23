import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

import PrivateRoute from './components/authorization/PrivateRoute';
import Content from './components/app/Content';

import Login from './containers/login/Login';
import Dashboard from './containers/dashboard/Dashboard';
import ListUsers from './containers/users/ListUsers';
import RegisterUser from './containers/users/RegisterUser';
import NotFound from './containers/errors/NotFound';

import AuthService from './services/auth';

import './App.css';

class App extends Component {
  render() {
    const { authReducer } = this.props;

    return (
      <Router>
        <Content>

          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />

            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
            />

            <PrivateRoute
              exact
              path="/users"
              component={ListUsers}
              roles={['manager', 'admin']}
            />

            <PrivateRoute
              exact
              path="/users/new"
              component={RegisterUser}
              roles={['admin']}
            />

            <PrivateRoute
              exact
              path="/users/:id/edit"
              component={RegisterUser}
            />

            <Route exact path="/not-found" component={NotFound} />

            <Route component={NotFound} />
          </Switch>

        </Content>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    authReducer: state.auth,
  }
}

export default connect(mapStateToProps)(App);