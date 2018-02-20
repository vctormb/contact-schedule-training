
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ListUsers extends Component {
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

    editUser = (userId) => {
        const props = this.props;

        props.history.push(`/users/${userId}/edit`);
    }

    renderUsers = () => {
        const { usersReducer } = this.props;

        if (usersReducer.users.isLoading) {
            return <span className="fetching-users">Loading...</span>
        }

        return usersReducer.users.items.map((val, index) => {
            return (
                <div key={index}>
                    <span>{val.name} - </span>
                    <button className={`edit-user-${index}`} onClick={() => this.editUser(val.id)}>Edit</button> 
                    <button>Delete</button>
                    <br />
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                {this.renderUsers()}
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