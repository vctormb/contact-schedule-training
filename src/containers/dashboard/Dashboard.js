import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import ToastrContainer from '../../components/dataDisplay/toastr/ToastrContainer'

class Dashboard extends Component {
    state = {
        index: 0
    }

    increment = () => {
        this.setState({
            index: this.state.index + 1
        }, () => {
            this.addToastr();
        });

    }

    addToastr = () => {
        const {dispatch} = this.props;

        dispatch({
            type: 'ADD_TOASTR_SUCCESS',
            toastr: {
                message: `Toastr! - ${this.state.index}`
            }
        })
    }

    render() {
        return (
            <div>
                <h2>Dashboard!</h2>
                <span><Link to="/users">List users</Link></span>
                <ToastrContainer duration={3} />
                <button onClick={this.increment}>Add toastr</button>
            </div>
        );
    }
}

export default connect()(Dashboard);