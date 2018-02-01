import React, { Component } from 'react';

const STATUS = {
    HOVERED: 'hovered',
    NORMAL: 'normal',
}

class Link extends Component {
    state = {
        class: STATUS.NORMAL,
    }

    _onMouseEnter = () => {
        this.setState({ class: STATUS.HOVERED });
    }

    _onMouseLeave = () => {
        this.setState({ class: STATUS.NORMAL });
    }

    render() {
        return (
            <a
                className={this.state.class}
                href={this.props.page || '#'}
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}
            >
                {this.props.children}
            </a>
        );
    }
}

export default Link;