export const actionTypes = {
    //设置学生查询结果数组和总数
    setStudentsAndTotal: Symbol("setStudentsAndTotal"),
    setIsLoading: Symbol("setIsLoading"),
    fetchStudents: Symbol("fetchStudents")
}

export function fetchStudents(){
    return {
        type: actionTypes.fetchStudents
    }
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
            total
        }
    }
}

/**
 * action creator
 * 得到一个设置是否正在加载中的action
 * @param {*} isLoading 
 */
export function setIsLoading(isLoading) {
    return {
        type: actionTypes.setIsLoading,
        payload: isLoading
    }
}