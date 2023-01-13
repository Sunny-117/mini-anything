/**
 * 模拟类组件的 pureComponent
 * @param {*} obj1 
 * @param {*} obj2 
 * @returns 
 */
export function compare(obj1, obj2) {
    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}
