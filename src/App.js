import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListUsers from './containers/users/ListUsers';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListUsers />
      </div>
    );
  }
}

export default App;