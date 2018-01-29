import React, { Component } from 'react';

export default class Input extends Component {
    state = {
        isChecked: false
    }

    componentDidMount() {
        this.applyCheck();
    }

    applyCheck = () => {
        const { check } = this.props;

        console.log(check);

        if (check) {
            this.setState({
                isChecked: check
            });
        }
    }

    handleOnClick = (e) => {
        const targetValue = e.target.checked;

        this.setState({
            isChecked: targetValue
        }, () => {
            this.cbOnClick(targetValue);
        });
    }

    cbOnClick = (value) => {
        const { onClick } = this.props;
        
        if (onClick) {
            onClick(value);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.check) {
            console.log(nextProps.check)
            this.setState({
                isChecked: nextProps.check
            });
        }
    }

    render() {
        const { type } = this.props;

        return (
            <input
                type={type}
                checked={this.state.isChecked}
                onClick={this.handleOnClick}
            />
        );
    }
}