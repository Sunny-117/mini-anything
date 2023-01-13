import React from 'react'
import { push } from "../../connected-react-router"
import { connect } from "react-redux"

function StudentAdd({ onClick }) {
    return (
        <div>
            <h1>添加页</h1>
            <button onClick={() => {
                onClick && onClick()
            }}>点击跳转到list</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    onClick: () => {
        dispatch(push("/courses"))
    }
})

export default connect(null, mapDispatchToProps)(StudentAdd)
