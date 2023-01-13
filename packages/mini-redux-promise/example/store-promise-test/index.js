// 用于创建仓库，并导出
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import promise from "../packages/redux-promise";
const store = createStore(reducer, applyMiddleware(promise, logger));

export default store;
