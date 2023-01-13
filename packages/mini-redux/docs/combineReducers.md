# combineReducers


组装reducers，返回一个reducer，数据使用一个对象表示，对象的属性名和传递的参数对象保持一致



先用官方的，src/store/reducer/loginUser.js 里面


```js
import { SETLOGINUSERTYPE } from "../action/loginUserAction"

const initialState = null

export default (state = initialState, { type, payload }) => {
    console.log(type)
    switch (type) {
        case SETLOGINUSERTYPE:
            return payload
        default:
            return state
    }
}


```

打印出来的type发现除了有自己初始化时候触发的type外，还有两次额外的type



![image-20221022160937804](./type.png)

原因：

```js
import { SETLOGINUSERTYPE } from "../action/loginUserAction"

const initialState = null

export default (state = initialState, { type, payload }) => {
    // console.log(type)
    // 防止：
    // if(type.startWith("@@redux/INIT")){
        // ...
    // }
    switch (type) {
        case SETLOGINUSERTYPE:
            return payload
        default:
            return state
    }
}


```


# 实现

传入一个对象：
{
 loginUser: fn reducer
 users: fn reducer
}
-->
reducer函数

这个函数返回状态：{loginUser:xxx, users:xxx}



## 结构

```js
export default function (reducers) {
  //1. 验证
  validateReducers(reducers);
  /**
   * 返回的是一个reducer函数
   */
  return function (state = {}, action) {
    const newState = {}; //要返回的新的状态
    // ...
    return newState; //返回状态
  };
}

```