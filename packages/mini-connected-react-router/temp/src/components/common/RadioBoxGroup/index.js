import React, { Component } from 'react'
import types from "../../../utils/commonTypes"
import PropTypes from "prop-types"
import withDataGroup from "../hoc/withDataGroup";

class Radio extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        info: types.singleData.isRequired, //当前单选框的value
        value: PropTypes.string.isRequired, //当前选中的value值
        onChange: PropTypes.func
    }

    render() {
        return <label key={this.props.info.value}>
            <input
                type="radio"
                name={this.props.name}
                value={this.props.info.value}
                checked={this.props.value === this.props.info.value}
                onChange={() => {
                    this.props.onChange && this.props.onChange(this.props.info.value)
                }}
            />
            {this.props.info.text}
        </label>
    }
}

export default withDataGroup(Radio);
