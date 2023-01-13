import { takeEvery, delay, put, cancel } from "../../../packages/redux-saga/effects"
import { decrease, actionTypes } from "../action/counter"

function* asyncDecrease() {
    yield delay(1000);
    yield put(decrease())
}

export default function* () {
    var task = yield takeEvery(actionTypes.asyncDecrease, asyncDecrease)
    yield delay(5000);
    yield cancel(task);
}