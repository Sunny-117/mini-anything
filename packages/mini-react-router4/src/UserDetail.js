import React from 'react'

export default function Detail(props) {
    return (<div>
        Detail {props.match.params.id}
    </div>)
}
