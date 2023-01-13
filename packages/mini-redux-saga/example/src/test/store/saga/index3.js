import { call, delay } from "../../../packages/redux-saga/effects"
import { increase } from "../action/counter"

/**
* saga任务
*/
export default function* () {
    while (true) {
        yield delay(3000);
        yield put(increase())
        const state = yield select();
        console.log(state);
    }
}
