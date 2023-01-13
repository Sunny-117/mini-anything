// 用于创建仓库，并导出
import { createStore, applyMiddleware } from "redux"
import reducer from "./reducer"
import { composeWithDevTools } from "redux-devtools-extension"
import { routerMiddleware } from "../connected-react-router"
import history from "./history"
const routerMid = routerMiddleware(history)


const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(routerMid))
)


export default store;