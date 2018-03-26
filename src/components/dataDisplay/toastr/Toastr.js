import React, { Component } from 'react';
import { connect } from 'react-redux';

class Toastr extends Component {
    componentDidMount() {
        const { toastrId, } = this.props;

        
        this.dismissToastrRequest(toastrId, 'didMount');
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, toastrId, duration, } = this.props;

        if (toastrId !== nextProps.toastrId) {
            this.dismissToastrRequest(nextProps.toastrId, 'willReceive');
        }
    }

    dismissToastrRequest = (toastrId, txt) => {
        const { dispatch, duration,} = this.props;

        console.log(toastrId)
        console.log(txt)
        console.log('>> dismissToastrRequest <<')

        dispatch({
            type: 'DISMISS_TOASTR_REQUEST',
            toastrId,
            duration,
        });
    }

    handleMouseOver = () => {
        const { dispatch, toastrId, } = this.props;

        dispatch({
            type: 'INTERRUPT_TOASTR_SUCCESS',
            toastrId,
        });
    }

    removeToastr = () => {
        const { dispatch, toastrId, } = this.props;

        dispatch({
            type: 'DISMISS_TOASTR_SUCCESS',
            toastrId
        });
    }

    render() {
        const { toastrReducer, message, toastrId} = this.props;

        return (
            <div style={styles.toastr} onMouseOver={this.handleMouseOver} onMouseLeave={() => this.dismissToastrRequest(toastrId, 'mouzLeav')}>
                <span>{message}</span>
                <button onClick={this.removeToastr}>Fechar</button>
            </div>
        );
    }
}

const styles = {
    toastr: {
        backgroundColor: 'gray',
        marginBottom: '10px',
        padding: '24px',
        color: 'white',
    },

}

export default connect()(Toastr);