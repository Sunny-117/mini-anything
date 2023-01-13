// import React, { Component } from 'react'
// import PropTypes from "prop-types";
// import ctx from "./RouterContext";
// import matchPath from "./matchPath"

// export default class Router extends Component {

//     static propTypes = {
//         history: PropTypes.object.isRequired,
//         children: PropTypes.node
//     }

//     state = {
//         location: this.props.history.location
//     }

//     componentDidMount() {
//         this.unListen = this.props.history.listen((location, action) => {
//             this.props.history.action = action;
//             this.setState({
//                 location
//             })
//         })
//     }

//     componentWillUnmount() {
//         this.unListen();//取消监听
//     }


// 。。。。。。错误。。。。。。
// 同一个对象引用不会刷新
//     ctxValue = {} //上下文中的对象

//     render() {
//         this.ctxValue.history = this.props.history;//该对象不变
//         this.ctxValue.location = this.state.location;// 会变化，只要变化，就让他重新渲染
//         this.ctxValue.match = matchPath("/", this.state.location.pathname);// 写死，根路径
//         return <ctx.Provider value={this.ctxValue}>
//             <h1>
//                 {this.state.location.pathname}
//             </h1>
//             <button onClick={() => {
//                 this.ctxValue.history.push('/1')
//             }}>页面跳转的时候需要重新改变状态: 需要加上监听器</button>
//             {this.props.children}
//         </ctx.Provider>
//     }
// }

import React, { Component } from 'react'
import PropTypes from "prop-types";
import ctx from "./RouterContext";
import matchPath from "./matchPath"

export default class Router extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        children: PropTypes.node
    }

    state = {
        location: this.props.history.location
    }

    componentDidMount() {
        this.unListen = this.props.history.listen((location, action) => {
            this.props.history.action = action;
            this.setState({
                location
            })
        })
    }

    componentWillUnmount() {
        this.unListen();
    }


    render() {
        const ctxValue = {
            history: this.props.history,
            location: this.state.location,
            match: matchPath("/", this.state.location.pathname)
        }
        return <ctx.Provider value={ctxValue}>
            {this.props.children}
        </ctx.Provider>
    }
}
