import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import store from "./store"
import Counter from './Counter'


function App() {
    return (
        <Provider store={store}>
            <Counter />
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));