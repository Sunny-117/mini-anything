// 用于创建仓库，并导出
import { createStore, applyMiddleware } from "redux"
import reducer from "./reducer"
import logger from "redux-logger"
import createSagaMiddleware from "../../../../"
import rootSaga from "./saga/index1"

const sagaMid = createSagaMiddleware(); //创建一个saga的中间件

const store = createStore(reducer,
    applyMiddleware(sagaMid, logger)
)

sagaMid.run(rootSaga, 1, 2, 3); //启动saga任务

export default store;