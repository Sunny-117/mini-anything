import React from 'react'
import { increase, decrease } from "./store/action/counter"
import { connect } from "./react-redux"
//展示组件
function Counter(props) {
    return (
        <div>
            <h1>{props.number}</h1>
            <p>
                <button onClick={props.onDecrease}> 减 </button>
                <button onClick={props.onIncrease}> 加 </button>
            </p>
        </div>
    )
}

/**
 * 将整个仓库的状态，映射到当前需要的数据
 * @param {*} state 
 */
function mapStateToProps(state, ownProps) {
    return {
        number: state.counter
    }
}

const creators = {
    onDecrease: decrease,
    onIncrease: increase,
};

export default connect(mapStateToProps, creators)(Counter)