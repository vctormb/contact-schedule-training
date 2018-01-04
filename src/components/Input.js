import React, { Component } from 'react';

class Input extends Component {
    render() {
        const { input, type, placeholder, label, meta: { touched, error } } = this.props;

        return (
            <div>
                <label>{label}</label>
                <input {...input} type={type} placeholder={placeholder} />
                {touched &&
                    error && <span>{error}</span>
                }
            </div>
        );
    }
}

export default Input;