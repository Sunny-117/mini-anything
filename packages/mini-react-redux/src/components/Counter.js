import React from 'react'
import { asyncDecrease, asyncIncrease, increase, decrease } from "../store/action/counter"
import { connect } from "react-redux"
//展示组件
function Counter(props) {
    return (
        <div>
            <h1>{props.number}</h1>
            <p>
                <button onClick={props.onAsyncDecrease}> 异步减 </button>
                <button onClick={props.onDecrease}> 减 </button>
                <button onClick={props.onIncrease}> 加 </button>
                <button onClick={props.onAsyncIncrease}> 异步加 </button>
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
    onAsyncDecrease: asyncDecrease,
    onDecrease: decrease,
    onIncrease: increase,
    onAsyncIncrease: asyncIncrease
};

export default connect(mapStateToProps, creators)(Counter)