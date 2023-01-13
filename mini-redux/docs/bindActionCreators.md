# bindActionCreators

内部自动dispatch，其他的保持一致

参数

- 情景1: 传递一个action创建函数

```js

const addUser = bindActionCreators(createAddUserAction, store.dispatch) 

// addUser({...})

```

- 情景2: 传递一个对象

```js
const actionCreator = {
    addUser: createAddUserAction,
    deleteUser: createDeleteUserAction
}

const actions = bindActionCreators(actionCreator, store.dispatch) // 返回一个和actionCreator长得一摸一样的对象，但是内部封装了触发
console.log(actions)
```

test

```js

import { createStore } from "../redux";
import { bindActionCreators } from '../redux'
import reducer from "./reducer"
import { createAddUserAction, createDeleteUserAction } from "./action/usersAction"

const store = createStore(reducer)
store.subscribe(() => {
    console.log('监听器1', store.getState())
})
const actionCreator = {
    addUser: createAddUserAction,
    deleteUser: createDeleteUserAction
}

const actions = bindActionCreators(actionCreator, store.dispatch) // 返回一个和actionCreator长得一摸一样的对象，但是内部封装了触发
// console.log(actions)

actions.addUser({
    id: 3,
    name: 'anbc',
    age: 11
})
actions.deleteUser(3)


```