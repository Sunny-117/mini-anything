import React, { Component } from 'react'
import { Router } from "react-router-dom"
import { createLocationChangeAction } from "./action-creators"
import { ReactReduxContext } from "react-redux"

export default class ConnectedRouter extends Component {
    static contextType = ReactReduxContext;
    componentDidMount() {
        var history = this.props.history;
        this.unListen = history.listen((location, action) => {
            var reduxAction = createLocationChangeAction(action, location);
            var dispatch = this.context.store.dispatch;
            dispatch(reduxAction);
        })
    }

    componentWillUnmount() {
        this.unListen();
    }

    render() {
        return <Router history={this.props.history}>
            {this.props.children}
        </Router>
    }
}
