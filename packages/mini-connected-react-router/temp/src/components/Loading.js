import React from 'react'
import Modal from "./common/Modal"
/**
 * 属性：
 * show：是否显示朦层
 * @param {*} props 
 */
export default function Loading(props) {
    return (
        <>
            {props.show && <Modal>
                <div style={{
                    color:"#fff",
                    fontSize:"3em"
                }}>加载中....</div>
            </Modal>}
        </>
    )
}
