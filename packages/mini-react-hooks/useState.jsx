
import ReactDOM from 'react-dom/client'
import React from 'react'
/**
 * 非源码，根据自己的理解把它实现
 * @param {*} ininialState 
 * @returns 
 */
const MyReact = (() => {
    console.log('重新渲染')
    const states = [],
        stateSetters = [];

    let stateIndex = 0;

    function createState(initialState, stateIndex) {
        return states[stateIndex] !== undefined ? states[stateIndex] : initialState;
    }

    function createStateSetter(stateIndex) {
        return function (newState) {
            if (typeof newState === 'function') {
                states[stateIndex] = newState(states[stateIndex]);
            } else {
                states[stateIndex] = newState;
            }

            render();
        }
    }

    function useState(initialState) {
        states[stateIndex] = createState(initialState, stateIndex);

        if (!stateSetters[stateIndex]) {
            stateSetters.push(createStateSetter(stateIndex));
        }

        const _state = states[stateIndex],
            _setState = stateSetters[stateIndex];

        stateIndex++;

        return [_state, _setState];// 为什么是数组：解构的时候重命名，只需要对应上下标
    }
    function render() {
        stateIndex = 0;

        ReactDOM.render(
            <App />,
            document.querySelector('#app')
        )
    }

    return {
        useState
    }
})();

const { useState } = MyReact;

function App() {

    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);

    return (
        <div>
            <h1>{count}</h1>
            <h1>{flag ? '打开状态' : '关闭状态'}</h1>
            <button onClick={() => setCount(count + 1)}>ADD 1</button>
            <button onClick={() => setCount(count => count - 1)}>MINUS 1</button>
            <button onClick={() => setFlag(flag => flag = !flag)}>{flag ? '关闭' : '打开'}</button>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#app')
)