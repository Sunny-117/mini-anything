import { actionTypes } from "../../action/student/searchCondition"

// 默认状态
const initialState = {
    key: "",
    sex: -1,
    page: 1,
    limit: 10
}
/**
 * 控制查询条件数据的reducer
 * @param {*} state 
 * @param {*} action 
 */
export default function (state = initialState, { type, payload }) {
    switch (type) {
        case actionTypes.change:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
}