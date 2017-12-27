import React, { Component } from 'react';
import { connect } from 'react-redux'

import './App.css';

class App extends Component {
  fetchUsers = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'FETCH_USERS_REQUEST',
      // payload: {} << here we can pass data to the saga (payload name is a convention)
    });
  }

  render() {
    return (
      <div className="App">
        <span>It worked!</span>

        {this.fetchUsers()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(App);