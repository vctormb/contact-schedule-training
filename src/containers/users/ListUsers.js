import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ListUsers extends Component {
    state = {}

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'FETCH_USERS_REQUEST',
            // payload: {} << here we can pass data to the saga (payload name is a convention)
        });
    }

    renderUsers = () => {
        const { usersReducer } = this.props;

        if (usersReducer.users.isLoading) {
            return <span>Loading...</span>
        }

        return usersReducer.users.items.map((val, index) => {
            return (
                <div key={index}>
                    <span>{val.name} - </span>
                    <label><Link to={`/users/${val.id}/edit`}>Edit</Link></label> | <label><Link to={`/users/${val.id}/delete`}>Delete</Link></label>
                    <br />
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                {this.renderUsers()} <br />
                <span><Link to="/">Back to dashboard</Link></span> - <span><Link to="/users/new">New user</Link></span>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        usersReducer: state.users
    }
}

export default connect(mapStateToProps)(ListUsers);