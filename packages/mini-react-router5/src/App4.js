import React from 'react'
import { BrowserRouter, Route, Link, NavLink } from "./react-router-dom"

function Page1() {
  return <div>
    <h1>Page1</h1>
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
      <ul>
        <li>
          <Link to='/page1'>跳转到页面1</Link>
          <Link to={{
            pathname: "/page1",
            search: "?a=1&b=2"
          }}>跳转到页面1</Link>
        </li>
        <li>
          <NavLink to="/page2">跳转到页面2</NavLink>
        </li>
      </ul>
    </BrowserRouter>
  )
}
