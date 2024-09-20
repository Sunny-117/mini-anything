// // 导入 createStore 函数
// import { createStore } from './vanilla';
// // 导入 useSyncExternalStore 函数
// import { useSyncExternalStore } from 'react';

// // 定义 useStore 函数，接收 api 对象作为参数
// export function useStore(api) {
//     // 使用 useSyncExternalStore 函数从 api 中获取状态值
//     let value = useSyncExternalStore(api.subscribe, api.getState);
//     return value;
// }

// // 定义 createImpl 函数，接收 createState 函数作为参数
// const createImpl = createState => {
//     // 调用 createStore 函数创建状态管理器
//     const api = createStore(createState);
//     // 返回一个函数，该函数将 api 对象传递给 useStore 函数
//     return () => useStore(api)
// }

// // 定义 create 函数，接收 createState 函数作为参数，返回 createImpl 函数的调用结果
// export const create = createState => createImpl(createState);

// // 默认导出 create 函数
// export default create;

// 导入 createStore 函数
import { createStore } from './vanilla';
// 导入 useSyncExternalStore 函数
import { useSyncExternalStore, useRef, useCallback } from 'react';
// 定义 useStore 函数，接收 api 对象作为参数
export function useStore(api, selector) {
    const lastSnapshotRef = useRef(null);
    const lastSelectionRef = useRef(null);
    const getSelection = useCallback(() => {
        let lastSelection = lastSelectionRef.current;
        if (lastSelection === null) {
            const nextSnapShot = api.getState();
            lastSelection = selector(nextSnapShot);
            lastSnapshotRef.current = nextSnapShot;
            lastSelectionRef.current = lastSelection;
            return lastSelection;
        }
        const lastSnapshot = lastSnapshotRef.current;
        const nextSnapShot = api.getState();
        if (Object.is(lastSnapshot, nextSnapShot)) {
            return lastSelection;
        }
        const nextSelection = selector(nextSnapShot);
        lastSnapshotRef.current = nextSnapShot;
        lastSelectionRef.current = nextSelection;
        return nextSelection;
    }, []);
    // 使用 useSyncExternalStore 函数从 api 中获取状态值
    let value = useSyncExternalStore(api.subscribe, getSelection);
    return value;
}

// 定义 createImpl 函数，接收 createState 函数作为参数
const createImpl = createState => {
    // 调用 createStore 函数创建状态管理器
    const api = createStore(createState);
    // 返回一个函数，该函数将 api 对象传递给 useStore 函数
    return (getSelection) => useStore(api, getSelection)
}

// 定义 create 函数，接收 createState 函数作为参数，返回 createImpl 函数的调用结果
export const create = createState => createImpl(createState);

// 默认导出 create 函数
export default create;