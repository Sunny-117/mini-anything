import routerConfig from "./routerConfig"
import dva from "./dva";
import counterModel from "./models/counter"
import studentsModel from "./models/students"
import { createBrowserHistory } from "history"

import createLoading from "./dva/dva-loading"

const logger = store => next => action => {
    console.log('%c [ 老状态： ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', store.getState())
    console.log("action：", action)
    next(action);
    console.log('%c [ 新状态： ]: ', 'color: #fff; background: green; font-size: 13px;', store.getState())

    console.log("")
}
const app = dva({
    history: createBrowserHistory(),
    initialState: {
        counter: 123
    },
    onError(err, dispatch) {
        console.log(err.message)
        console.log(dispatch)
    },
    onAction: logger,
    onStateChange(state) {// 每一次状态变化，得到新的状态
        console.log(state.counter)
    },
    /**
     * 传入一个reducer，返回一个新的reducer
     * @param {*} reducer 
     * @returns 
     */
    onReducer(reducer) {
        return function (state, action) {
            console.log("reducer即将执行")
            return reducer(state, action);
        }
    },
    onEffect(effect, sagaEffects, model, actionType) {
        return function* (action) {
            console.log("副作用即将产生")
            yield effect(action);
        }
    },
    extraReducers: {
        abc(state = 123, action) {
            return state;
        }
    },
    extraEnhancers: [function (createStore) {
        return function (...args) {
            console.log("即将创建仓库")
            return createStore(...args);
        }
    }]
});
app.use(createLoading());
//在启动之前定义模型
app.model(counterModel)
app.model(studentsModel)

//设置根路由，即启动后，要运行的函数，函数的返回结果会被渲染
app.router(routerConfig)

app.start("#root");