import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toastr from './Toastr';

class ToastrContainer extends Component {
    state = {}

    render() {
        const { toastrReducer, duration, } = this.props;

        return (
            <div style={styles.wrapper}>
                {
                    toastrReducer.toastrs.map((val, index) => {
                        return (
                            <Toastr
                                key={index}
                                toastrId={val.id}
                                message={val.message}
                                duration={duration}
                                called={val.called}
                            />
                        )
                    })
                }
            </div>
        );
    }
}

const styles = {
    wrapper: {
        position: 'fixed',
        bottom: '24px',
        left: '24px',
    },
    toastr: {
        backgroundColor: 'gray',
        marginBottom: '10px',
        padding: '24px',
        color: 'white',
    },

}

const mapStateToProps = state => ({
    toastrReducer: state.toastr
});

export default connect(mapStateToProps)(ToastrContainer);