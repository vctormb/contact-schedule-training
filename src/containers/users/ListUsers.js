import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        const { users } = this.props;

        if (users.users.isLoading) {
            return <span>Loading...</span>
        }

        return users.users.items.map((val, index) => {
            return (
                <div key={index}>
                    <span>{val.name} - </span>
                    <button>Edit</button> 
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
        users: state.users
    }
}

export default connect(mapStateToProps)(ListUsers);