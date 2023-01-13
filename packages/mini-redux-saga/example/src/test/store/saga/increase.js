import { takeEvery, delay, put, cancel } from "../../../packages/redux-saga/effects"
import { increase, actionTypes } from "../action/counter"

function* asyncIncrease() {
    yield delay(1000);
    yield put(increase())
}

export default function* () {
    const task = yield takeEvery(actionTypes.asyncIncrease, asyncIncrease)
    yield delay(6000)
    yield cancel(task)
}