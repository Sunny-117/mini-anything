import loginUserReducer from "./loginUser"
import usersReducer from './users'
import { combineReducers } from "../../redux-core"

// export default (state = {}, action) => {
//     const newState = {
//         loginUser: loginUserReducer(state.loginUser, action),
//         users: usersReducer(state.users, action)
//     };
//     return newState;
// }

export default combineReducers({
    loginUser: loginUserReducer,
    users: usersReducer
})