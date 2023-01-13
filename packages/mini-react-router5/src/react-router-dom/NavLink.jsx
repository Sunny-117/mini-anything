import React from 'react'
import Link from "./Link"
import ctx from "../react-router/RouterContext"
import matchPath from "../react-router/matchPath"
import { parsePath } from "history"

export default function NavLink(props) {
    const {
        activeClass = "active",
        exact = false,
        strict = false,
        sensitive = false,
        ...rest } = props
    return (
        <ctx.Consumer>
            {({ location }) => {
                let loc; //保存to中的locaiton对象
                if (typeof props.to === "string") {
                    loc = parsePath(props.to);
                }
                const result = matchPath(loc.pathname, location.pathname, { exact, strict, sensitive })
                if (result) {
                    return <Link {...rest} className={activeClass} />
                }
                else {
                    return <Link {...rest} />
                }
            }}
        </ctx.Consumer>

    )
}
