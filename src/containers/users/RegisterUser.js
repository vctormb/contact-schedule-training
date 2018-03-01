import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RegisterUserForm from './RegisterUserForm';

export class RegisterUser extends Component {
    componentDidMount() {
        const { match, dispatch } = this.props;

        // if params has id, it is to edit the user
        if (match.params.id) {
            dispatch({
                type: 'FETCH_USER_REQUEST',
                payload: { userId: match.params.id }
            });
        } else { // if params has no id, reset the user reducer to reset the redux-form
            dispatch({ type: 'REGISTER_USER_RESET' });
        }
    }

    handleSubmit = (values) => {
        const { dispatch } = this.props;

        alert(JSON.stringify(values, null, 2));

        dispatch({
            type: 'ADD_USER_REQUEST',
            push: this.props.history.push
        });
    }

    render() {
        return (
            <div>
                <RegisterUserForm onSubmit={this.handleSubmit} />
                <br />
                <span><Link to="/users">Back to users list</Link></span>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        usersReducer: state.users
    }
}

export default connect(mapStateToProps)(RegisterUser);