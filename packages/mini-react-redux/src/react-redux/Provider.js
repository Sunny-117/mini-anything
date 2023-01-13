import React from "react"
import ctx from "./ctx"

export default function Provider(props) {
    return <ctx.Provider value={props.store}>
        {props.children}
    </ctx.Provider>
}
