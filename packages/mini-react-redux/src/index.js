import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "./react-redux"
// import store from "./store"
// import StudentSearch from "./components/StudentSearch"

function App() {
    return (
        <Provider store={store}>
            {/* <StudentSearch /> */}
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));