import React from 'react'
import { Provider } from "react-redux"
import store from "./store"
import { Route } from "react-router-dom"
import { ConnectedRouter } from "./connected-react-router"
import Admin from "./pages/Admin"
import history from "./store/history"

export default function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Route path="/" component={Admin} />
            </ConnectedRouter>
        </Provider>
    )
}
