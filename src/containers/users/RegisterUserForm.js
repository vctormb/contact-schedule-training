import React, { Component } from 'react';
import { connect } from 'react-redux';

// withRouter -> to access the route props in a component that is not a route component
import { withRouter } from 'react-router';

import { Field, FormSection, reduxForm } from 'redux-form';
import Input from '../../components/Input';
import { validateForm } from './formValidations/registerUserForm';

class RegisterUserForm extends Component {
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

    render() {
        const { handleSubmit, invalid } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name="name" label="Name" component={Input} type="text" placeholder="Name" />
                </div>
                <div>
                    <Field name="email" label="Email" component={Input} type="email" placeholder="Email" />
                </div>
                <div>
                    <FormSection name="address">
                        <Field name="city" label="City" component={Input} type="text" />
                        <Field name="street" label="Street" component={Input} type="text" />
                    </FormSection>
                </div>
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