export default function (actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    //传入的是函数
    return getAutoDispatchActionCreator(actionCreators, dispatch);
  } else if (typeof actionCreators === "object") {
    //传入的是对象
    const result = {}; //返回结果
    for (const key in actionCreators) {
      if (actionCreators.hasOwnProperty(key)) {
        const actionCreator = actionCreators[key]; //取出对应的属性值
        if (typeof actionCreator === "function") {
          // 最好验证一下
          // 验证传递的是啥，只有传递是函数的时候才分发
          result[key] = getAutoDispatchActionCreator(actionCreator, dispatch);
        }
      }
    }
    return result;
  } else {
    throw new TypeError(
      "actionCreators must be an object or function which means action creator"
    );
  }
}
/**
 * 得到一个自动分发的action创建函数
 */
function getAutoDispatchActionCreator(actionCreator, dispatch) {
  return function (...args) {
    // 新的函数把原函数增强
    //   参数不固定
    const action = actionCreator(...args);
    dispatch(action); // 自动分发
  };
}
