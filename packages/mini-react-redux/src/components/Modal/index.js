import React from 'react'
import "./index.css"
Modal.defaultProps = { //默认属性
    bg: "rgba(0,0,0,.5)"
};

export default function Modal(props) {

    return (
        <div onClick={e => {
            if (e.target.className === "modal") {
                props.onClose();
            }
        }} className="modal" style={{
            background: props.bg
        }}>
            <div className="modal-center">
                {props.children}
            </div>
        </div>
    )
}
