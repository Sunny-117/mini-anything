import { CALL_HISTORY_METHOD } from "./actionTypes"

export default history => store => next => action => {
    if (action.type === CALL_HISTORY_METHOD) {
        //调用history对应的方法
        const { method, args } = action.payload;
        history[method](...args);
        //不再向下传递action
    } else {
        next(action);
    }
}