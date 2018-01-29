import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomTable from '../../components/dataDisplay/table/CustomTable'

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

    handleRowSelection = (values) => {
        console.log(values)
    }

    render() {
        const { items } = this.props.usersReducer.users;

        return (
            <div>
                <CustomTable
                    data={items}
                    header={[
                        { key: 'name', name: 'Name' },
                        { key: 'email', name: 'Email' },
                    ]}
                    rowSelection={this.handleRowSelection}
                />

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