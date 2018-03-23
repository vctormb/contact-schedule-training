import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
    state = {}

    login = () => {
        const { dispatch, history: { push } } = this.props;
        const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };

        dispatch({
            type: 'LOGIN_REQUEST',
            push,
            from,
        });
    }

    loadingLogin = () => {
        return '...';
    }

    render() {
        const props = this.props;

        return (
            <div>
                <button onClick={this.login}>
                    Login {props.authReducer.login.isLoading && this.loadingLogin()}
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authReducer: state.auth,
    }
}

export default connect(mapStateToProps)(Login);