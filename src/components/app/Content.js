import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    withRouter,
} from 'react-router-dom';

import { checkUserLoggedIn } from '../../redux/auth/actions';

class Content extends Component {
    state = {}

    componentDidMount() {
        this.checkUserLoggedIn();
    }

    checkUserLoggedIn() {
        const { dispatch, } = this.props;

        dispatch(checkUserLoggedIn());
    }

    logout = () => {
        const { dispatch, history: { push } } = this.props;

        dispatch({
            type: 'LOGOUT_REQUEST',
            push,
        });
    }

    render() {
        const { authReducer } = this.props;

        return (
            <div className="App">
                {
                    Object.keys(authReducer.loggedUser.data).length ? `Hi, ${authReducer.loggedUser.data.firstName} ` : null
                }
                {
                    authReducer.login.isLoggedIn ? <button onClick={this.logout}>logout</button> : null
                }

                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authReducer: state.auth,
});

export default withRouter(connect(mapStateToProps)(Content));