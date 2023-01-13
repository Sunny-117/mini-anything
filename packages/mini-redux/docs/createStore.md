# createStore

返回一个对象：

-  dispatch：分发一个action
-  getState：得到仓库中当前的状态
-  subscribe：注册一个监听器，监听器是一个无参函数，该分发一个action之后，会运行注册的监听器。该函数会返回一个函数，用于取消监听



# test


```jsx
import { createStore } from "../redux";
import reducer from "./reducer"
import { createAddUserAction, createDeleteUserAction } from "./action/usersAction"


const store = createStore(reducer);


const unListen = store.subscribe(() => {
    console.log("监听器1", store.getState());
})

store.dispatch(createAddUserAction({
    id: 3,
    name: "abc",
    age: 10
}));

unListen(); //取消监听

store.dispatch(createDeleteUserAction(3));

```



# 配合中间件

```js
import ActionTypes from "./utils/ActionTypes";
import isPlainObject from "./utils/isPlainObject";

/**
 * 实现createStore的功能
 * @param {function} reducer reducer
 * @param {any} defaultState 默认的状态值
 */
export default function createStore(reducer, defaultState, enhanced) {
  // 需要调用applyMiddleware函数，将函数的返回结果作为createStore的第二或第三个参数
  //enhanced表示applymiddleware返回的函数
  if (typeof defaultState === "function") {
    //第二个参数是应用中间件的函数返回值
    enhanced = defaultState;
    defaultState = undefined;
  }
  if (typeof enhanced === "function") {
    //进入applyMiddleWare的处理逻辑
    return enhanced(createStore)(reducer, defaultState);
  }

  let currentReducer = reducer, //当前使用的reducer
    currentState = defaultState; //当前仓库中的状态

  const listeners = []; //记录所有的监听器（订阅者）

  function dispatch(action) {
    //验证action
    if (!isPlainObject(action)) {
      throw new TypeError("action must be a plain object");
    }
    //验证action的type属性是否存在
    if (action.type === undefined) {
      throw new TypeError("action must has a property of type");
    }
    currentState = currentReducer(currentState, action);
    //运行所有的订阅者（监听器）
    for (const listener of listeners) {
      listener();
    }
  }

  function getState() {
    return currentState;
  }

  /**
   * 添加一个监听器（订阅器）
   */
  function subscribe(listener) {
    listeners.push(listener); //将监听器加入到数组中
    let isRemove = false; //是否已经移除掉了
    return function () {
      if (isRemove) {
        return;
      }
      //将listener从数组中移除
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
      isRemove = true;
    };
  }

  //创建仓库时，需要分发一次初始的action
  dispatch({
    type: ActionTypes.INIT(),
  });

  return {
    dispatch,
    getState,
    subscribe,
  };
}

```