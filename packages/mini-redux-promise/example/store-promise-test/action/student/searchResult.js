import { searchStudents } from "../../../services/student";

export const actionTypes = {
  //设置学生查询结果数组和总数
  setStudentsAndTotal: "setStudentsAndTotal",
  setIsLoading: Symbol("setIsLoading"),
};

/**
 * action creator
 * 得到一个设置是否正在加载中的action
 * @param {*} isLoading
 */
export function setIsLoading(isLoading) {
  return {
    type: actionTypes.setIsLoading,
    payload: isLoading,
  };
}

/**
 * 根据当前仓库中的查询条件，查询学生
 */
// export function fetchStudents() {
//     return async function (dispatch, getState) {
//         dispatch(setIsLoading(true));
//         const condition = getState().students.condition;
//         const resp = await searchStudents(condition)
//         dispatch(setStudentsAndTotal(resp.datas, resp.cont));
//         dispatch(setIsLoading(false));
//     }
// }

// /**
//  * 由于使用了redux-promise中间件，因此，允许action是一个promise，在promise中，如果要触发action，则使用resolve
//  */
// export function fetchStudents() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             const action = setStudentsAndTotal([{ id: 1, name: "aaa" }, { id: 2, name: "bbb" }], 2);
//             resolve(action)
//         }, 3000);
//     })
// }

// export async function fetchStudents(condition) {
//     const resp = await searchStudents(condition)
//     return setStudentsAndTotal(resp.datas, resp.cont);
// }

export async function fetchStudents(condition) {
  // 返回一个普通的action，只不过payload属性是一个promise
  return {
    type: actionTypes.setStudentsAndTotal,
    payload: searchStudents(condition).then((resp) => ({
      datas: resp.datas,
      total: resp.cont,
    })),
  };
}

/**
 * action creator
 * 得到一个设置学生数组和总数的action
 * @param {*} arr
 * @param {*} total
 */
export function setStudentsAndTotal(arr, total) {
  return {
    type: actionTypes.setStudentsAndTotal,
    payload: {
      datas: arr,
      total,
    },
  };
}
