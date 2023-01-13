// 用于创建仓库，并导出
import { createStore, applyMiddleware } from "redux"
import reducer from "./reducer"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./saga"
import { composeWithDevTools } from "redux-devtools-extension"
import { routerMiddleware } from "../connected-react-router"
import history from "./history"
const routerMid = routerMiddleware(history)

const sagaMid = createSagaMiddleware(); //创建一个saga的中间件

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(routerMid, sagaMid))
)

sagaMid.run(rootSaga); //启动saga任务

export default store;