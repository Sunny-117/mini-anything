import * as usersAction from "../action/usersAction"
import { v4 as uuid } from "uuid"

const initialState = [
    { id: uuid(), name: "用户1", age: 11 },
    { id: uuid(), name: "用户2", age: 12 }
];

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case usersAction.ADDUSER:
            return [...state, payload];
        case usersAction.DELETEUSER:
            return state.filter(it => it.id !== payload);
        case usersAction.UPDATEUSER:
            return state.map(it => it.id === payload.id ? { ...it, ...payload } : it);
        default:
            return state
    }
}
