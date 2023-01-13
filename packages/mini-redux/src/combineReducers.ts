import isPlainObject from "./utils/isPlainObject";
import ActionTypes from "./utils/ActionTypes";

function validateReducers(reducers) {
  if (typeof reducers !== "object") {
    throw new TypeError("reducers must be an object");
  }
  if (!isPlainObject(reducers)) {
    throw new TypeError("reducers must be a plain object");
  }
  //验证 reducer 的返回结果是不是undefined，不能是undefined
  for (const key in reducers) {
    if (reducers.hasOwnProperty(key)) {
      const reducer = reducers[key]; //拿到reducer
      //传递一个特殊的type值
      let state = reducer(undefined, {
        type: ActionTypes.INIT(),
      });
      if (state === undefined) {
        throw new TypeError("reducers must not return undefined");
      }
      // 再次触发
      state = reducer(undefined, {
        type: ActionTypes.UNKNOWN(),
      });
      if (state === undefined) {
        throw new TypeError("reducers must not return undefined");
      }
    }
  }
}

export default function (reducers) {
  //1. 验证
  validateReducers(reducers);
  /**
   * 返回的是一个reducer函数
   */
  return function (state = {}, action) {
    const newState = {}; //要返回的新的状态
    for (const key in reducers) {
      if (reducers.hasOwnProperty(key)) {
        const reducer = reducers[key];
        newState[key] = reducer(state[key], action); //调用reducer
      }
    }
    return newState; //返回状态
  };
}
