

import { take, delay, put, fork } from "../../../packages/redux-saga/effects"
import { increase, actionTypes } from "../action/counter"
function* test(a, b) {
    while (true) {
        yield take(actionTypes.asyncIncrease)
        yield delay(1000)
        yield put(increase())
    }
}
export default function* () {
    const task = yield fork(test, 123, 234)
    console.log('saga任务运行结束', task)
}
