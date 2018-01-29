import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../dataEntry/input/Input';

import { Table } from 'reactstrap';

export default class CustomTable extends Component {
    state = {
        selectedRows: [],
        checkAllRows: false
    }

    renderTableHeader = () => {
        const { header, rowSelection } = this.props;

        return (
            <tr>
                {rowSelection ?
                    <th>
                        <Input type="checkbox" onClick={(e) => this.checkAllRows(e)} />
                    </th> : null}

                {header.map((val, index) => {
                    return (
                        <th key={index}>{val.name}</th>
                    )
                })}
            </tr>
        )
    }

    checkAllRows = (isChecked) => {
        this.setState({
            checkAllRows: isChecked
        });
    }

    addOrRemoveSelectedRow = (isChecked, value, rowIndex) => {
        if (isChecked) {
            this.addSelectedRow(value, rowIndex);
        } else {
            this.removeSelectedRow(rowIndex);
        }
    }

    addSelectedRow = (value, rowIndex) => {
        const { rowSelection } = this.props;
        const { selectedRows } = this.state;

        this.setState({
            selectedRows: selectedRows.concat({
                ...value,
                rowIndex: rowIndex
            })
        }, () => {
            rowSelection(this.state.selectedRows);
        });
    }

    removeSelectedRow = (rowIndex) => {
        const { rowSelection } = this.props;

        this.setState(prevState => ({
            selectedRows: prevState.selectedRows.filter(val => val.rowIndex !== rowIndex)
        }), () => {
            rowSelection(this.state.selectedRows);
        });
    }

    renderTableData = () => {
        const { data, rowSelection, } = this.props;
        const { checkAllRows } = this.state;

        return data.map((val, index) => {
            return (
                <tr key={val.id}>
                    {rowSelection ?
                        <td>
                            <Input
                                type="checkbox"
                                onClick={(e) => this.addOrRemoveSelectedRow(e, val, index)}
                                //check={} // encontrar um jeito de dar check em um só quando estiver no allCheck
                            />
                        </td>
                        : null}

                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>
                        <label>
                            <Link to={`/users/${val.id}/edit`}>Edit</Link>
                        </label> |
                        <label>
                            <Link to={`/users/${val.id}/delete`}>Delete</Link>
                        </label>
                    </td>
                </tr>
            )
        });
    }

    render() {
        return (
            <Table hover>
                <thead>
                    {this.renderTableHeader()}
                </thead>
                <tbody>
                    {this.renderTableData()}
                </tbody>
            </Table>
        );
    }
}