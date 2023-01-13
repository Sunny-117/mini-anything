import { all } from "../../../packages/redux-saga/effects"
import increase from "./increase"
import decrease from "./decrease"
/**
* saga任务
*/
export default function* () {
    yield all([increase(), decrease()])
    console.log("saga 结束了")
}
