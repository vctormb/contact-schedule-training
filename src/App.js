import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import PrivateRoute from './components/authorization/PrivateRoute';

import Login from './containers/login/Login';
import Dashboard from './containers/dashboard/Dashboard';
import ListUsers from './containers/users/ListUsers';
import RegisterUser from './containers/users/RegisterUser';
import NotFound from './containers/errors/NotFound';

import './App.css';

class App extends Component {
  checkIsLoggedIn() {
    const { authReducer } = this.props;

    return authReducer.login.isLoggedIn;
  }

  render() {
    return (
      <Router>
        <div className="App"> {/* <-- here we can create a main template to involve the entire app */}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />

            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
              authorized={this.checkIsLoggedIn()}
            />

            <PrivateRoute
              exact
              path="/users"
              component={ListUsers}
              authorized={this.checkIsLoggedIn()}
            />

            <PrivateRoute
              exact
              path="/users/new"
              component={RegisterUser}
              authorized={this.checkIsLoggedIn()}
            />

            <Route
              exact
              path="/users/:id/edit"
              component={RegisterUser}
              authorized={this.checkIsLoggedIn()}
            />

            <Route exact path="/not-found" component={NotFound} />

            <Route component={NotFound} />
          </Switch>
        </div>
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