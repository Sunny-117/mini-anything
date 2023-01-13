import React, { Component } from 'react'
import { createBrowserHistory } from "./history"
import { Router } from "../react-router"

export default class BrowserRouter extends Component {

    history = createBrowserHistory(this.props)

    render() {
        return <Router history={this.history}>
            {this.props.children}
        </Router>
    }
}
