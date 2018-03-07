import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
    state = {}

    componentWillMount() {
        const { authReducer, history, } = this.props;

        if (authReducer.login.isLoggedIn) {
            history.push('/');
        }
    }

    login = () => {
        const props = this.props;
        const { dispatch, history: { push } } = this.props;
        const { from } = props.location.state || { from: { pathname: "/dashboard" } };

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