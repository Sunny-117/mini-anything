# withRouter

HOC高阶组件，用于将路由上下文中的数据，作为属性注入到组件中


```jsx

import React from 'react'
import { BrowserRouter, Route, withRouter } from "./react-router-dom"

function Comp(props) {
    return <div>
        {props.text}
        <button onClick={() => {
            props.history.push("/page2")
        }}>跳转到page2</button>
    </div>
}

const CompWithRouter = withRouter(Comp);

function Page1() {
    return <div>
        <h1>Page1</h1>
        <CompWithRouter text="abc" />
    </div>
}

function Page2() {
    return <h1>Page2</h1>
}

export default function App() {
    return (
        <BrowserRouter>
            <Route path="/page1" component={Page1} />
            <Route path="/page2" component={Page2} />
        </BrowserRouter>
    )
}


```