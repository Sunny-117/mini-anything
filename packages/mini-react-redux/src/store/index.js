import { createStore, applyMiddleware } from "redux"
import reducer from "./reducer"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./saga"

const sagaMid = createSagaMiddleware(); //创建一个saga的中间件

const store = createStore(reducer,
    applyMiddleware(sagaMid)
)
console.log(store.getState())

sagaMid.run(rootSaga); //启动saga任务

export default store;