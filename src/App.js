import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Dashboard from './containers/dashboard/Dashboard';
import ListUsers from './containers/users/ListUsers';
import RegisterUser from './containers/users/RegisterUser';
import NotFound from './containers/errors/NotFound';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App"> {/* <-- here we can create a main template to involve the entire app */}
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/users" component={ListUsers} />
            <Route exact path="/users/new" component={RegisterUser} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;