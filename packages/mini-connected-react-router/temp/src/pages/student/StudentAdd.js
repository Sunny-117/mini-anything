import React from 'react'
import { push } from "../../connected-react-router"
import { connect } from "react-redux"

function StudentAdd({ onClick }) {
    return (
        <div>
            <h1>添加学生页</h1>
            <button onClick={() => {
                onClick && onClick()
            }}>点击跳转到课程列表</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    onClick: () => {
        dispatch(push("/courses"))
    }
})

export default connect(null, mapDispatchToProps)(StudentAdd)
