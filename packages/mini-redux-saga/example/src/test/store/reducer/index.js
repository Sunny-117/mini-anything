// 创建一个唯一的reducer
import students from "./student"
import counter from "./counter"
import { combineReducers } from "redux"

export default combineReducers({
    students,
    counter
})