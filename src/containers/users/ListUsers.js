
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class ListUsers extends Component {
    state = {}

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'FETCH_USERS_REQUEST',
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
                    <button className={`delete-user-${index}`} onClick={() => this.deleteUser(val.id)}>Delete</button>
                    <br />
                </div>
            )
        });
    }

    deleteUser = (userId) => {
        const { dispatch } = this.props;

        dispatch({
            type: 'DELETE_USER_REQUEST',
            payload: {
                userId
            }
        });
    }

    loadingDeleteUser = () => {
        return <span className="deleting-user">Loading...</span>
    }

    render() {
        const { usersReducer } = this.props;

        return (
            <div>
                {usersReducer.deleteUser.isLoading && this.loadingDeleteUser()}
                {this.renderUsers()}
                <Link to="/users/new" className="add-new-user">New user</Link>
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