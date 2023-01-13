

import { take, delay, put } from "../../../packages/redux-saga/effects"
import { increase, actionTypes } from "../action/counter"

/**
* saga任务
*/
export default function* () {
    while (true) {
        console.log('监听', actionTypes.asyncIncrease)
        const action = yield take(actionTypes.asyncIncrease)
        console.log('完整的action', action)
        yield delay(1000)
        yield put(increase())
    }

}
