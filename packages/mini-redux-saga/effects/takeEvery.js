import { fork } from "./fork"
import { take } from "./take"

export function takeEvery(actionType, func, ...args) {
    //开启一个新的任务
    return fork(function* () {
        while (true) {
            const action = yield take(actionType)
            yield fork(func, ...args.concat(action))
        }
    })
}