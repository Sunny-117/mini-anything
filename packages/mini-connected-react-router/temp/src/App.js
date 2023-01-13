import React from 'react'
import { Provider } from "react-redux"
import store from "./store"
import { Route, Switch } from "react-router-dom"
import { ConnectedRouter } from "./connected-react-router"
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import history from "./store/history"

export default function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Admin} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    )
}
