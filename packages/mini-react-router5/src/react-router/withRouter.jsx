import React from "react"
import ctx from "./RouterContext"

export default function withRouter(Comp) {
    function RouterWrapper(props) {
        return <ctx.Consumer>
            {value => <Comp {...value} {...props} />}
        </ctx.Consumer>
    }
    //设置组件在调试工具中显示的名字
    RouterWrapper.displayName = `withRouter(${Comp.displayName || Comp.name})`;
    return RouterWrapper;
}