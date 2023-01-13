import React, { Component } from 'react'
import types from "../../../utils/commonTypes"
import PropTypes from "prop-types"
import withDataGroup from "../hoc/withDataGroup";

class Option extends Component {
    static propTypes = {
        info: types.singleData
    }

    render() {
        return <option value={this.props.info.value}>
            {this.props.info.text}
        </option>
    }
}

const OptGroup = withDataGroup(Option);

export default class Select extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func
    }


    render() {
        return <select name={this.name} value={this.props.value}
            onChange={(e) => {
                this.props.onChange && this.props.onChange(e.target.value)
            }}
        >
            <OptGroup {...this.props}></OptGroup>
        </select>
    }
}