import './中间件测试/index.js'
import { createStore, bindActionCreators } from "../../../lib/guide-mini-redux.esm";
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


actions.addUser({
    id: 3,
    name: 'anbc',
    age: 11
})
actions.deleteUser(3)
