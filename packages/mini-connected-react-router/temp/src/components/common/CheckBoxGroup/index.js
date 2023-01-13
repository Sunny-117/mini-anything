import React, { Component } from 'react'
import types from "../../../utils/commonTypes"
import PropTypes from "prop-types"
import withDataGroup from "../hoc/withDataGroup"
class CheckBox extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        info: types.singleData.isRequired,
        chooseDatas: types.chooseDatas.isRequired
    }

    handleChange = e => {
        let newArr;
        if (e.target.checked) {
            newArr = [...this.props.chooseDatas, e.target.value];
        }
        else {
            newArr = this.props.chooseDatas.filter(it => it !== e.target.value);
        }
        this.props.onChange && this.props.onChange(newArr);
    }

    render() {
        return (<label>
            <input
                type="checkbox"
                name={this.props.name}
                value={this.props.info.value}
                checked={this.props.chooseDatas.includes(this.props.info.value)}
                onChange={this.handleChange}
            />
            {this.props.info.text}
        </label>);
    }
}

/**
 * 一组多选框
 */
export default withDataGroup(CheckBox);
