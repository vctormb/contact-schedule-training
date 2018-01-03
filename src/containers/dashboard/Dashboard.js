import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <h2>Dashboard!</h2>
                <span><Link to="/users">List users</Link></span>
            </div>
        );
    }
}