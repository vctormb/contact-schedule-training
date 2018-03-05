import React, { Component } from 'react';
import { connect } from 'react-redux';

// withRouter -> to access the route props in a component that is not a route component
import { withRouter } from 'react-router';

import { Field, FormSection, reduxForm } from 'redux-form';
import Input from '../../components/Input';
import { validateForm } from './formValidations/registerUserForm';

export class RegisterUserForm extends Component {
    render() {
        const { handleSubmit, invalid } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Field name="name" label="Name" component={Input} type="text" placeholder="Name" />

                <Field name="email" label="Email" component={Input} type="email" placeholder="Email" />

                <FormSection name="address">
                    <Field name="city" label="City" component={Input} type="text" />
                    <Field name="street" label="Street" component={Input} type="text" />
                </FormSection>
                <button type="submit" disabled={invalid}>Submit</button>
            </form>
        );
    }
}

RegisterUserForm = reduxForm({
    form: 'registerUser', // a unique name for the form
    validate: validateForm, // form validations
    enableReinitialize: true // reinitialize every time the initialValues prop changes
})(RegisterUserForm);

function mapStateToProps(state) {
    return {
        initialValues: state.users.user.data, // the values to initialize your form
    }
}

export default withRouter(connect(mapStateToProps)(RegisterUserForm));