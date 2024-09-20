/**
 * 原生 框架无光
 */

// 定义 createStoreImpl 函数，接收 createState 函数作为参数
const createStoreImpl = createState => {
    // 定义变量 state 和 listeners
    let state;
    let listeners = new Set();
    // 定义函数 getState，返回 state 的值
    const getState = () => state;
    // 定义函数 setState，接收 partial 作为参数
    const setState = (partial) => {
        // 根据 partial 的类型，判断 nextState 的值
        const nextState = typeof partial === 'function' ? partial(state) : partial;
        // 如果 nextState 和 state 的值不同
        if (!Object.is(nextState, state)) {
            // 记录上一个状态
            const previousState = state;
            // 将 state 更新为 nextState
            state = Object.assign({}, state, nextState);
            // 遍历 listeners，执行每个监听器的回调函数
            listeners.forEach(listener => listener(state, previousState));
        }
    }
    // 定义函数 subscribe，接收 listener 作为参数
    const subscribe = (listener) => {
        // 将 listener 添加到 listeners 中
        listeners.add(listener);
        // 返回一个函数，用于从 listeners 中删除 listener
        return () => listeners.delete(listener);
    }
    // 定义变量 api，包含 getState、setState 和 subscribe 函数
    const api = {
        getState,
        setState,
        subscribe
    }
    // 调用 createState 函数，初始化 state 的值
    state = createState(setState, getState, api);
    // 返回 api
    return api;
}

// 定义 createStore 函数，接收 createState 函数作为参数，返回 createStoreImpl(createState)
export const createStore = createState => createStoreImpl(createState);

// 默认导出 createStore 函数
export default createStore;