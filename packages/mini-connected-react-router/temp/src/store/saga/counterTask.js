import { takeEvery, delay, put } from "redux-saga/effects"
import { actionTypes, increase, decrease } from "../action/counter"

function* asyncIncrease() {
    yield delay(2000);
    yield put(increase())
}

function* asyncDecrease() {
    yield delay(2000);
    yield put(decrease())
}

export default function* () {
    yield takeEvery(actionTypes.asyncIncrease, asyncIncrease)
    yield takeEvery(actionTypes.asyncDecrease, asyncDecrease)
}