import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegisterUserForm from './RegisterUserForm';

class RegisterUser extends Component {
    handleSubmit = (values) => {
        alert(JSON.stringify(values, null, 2));
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

export default RegisterUser;