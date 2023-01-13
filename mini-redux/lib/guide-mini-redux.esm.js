/**
 * 得到一个指定长度的随机字符串
 * @param {*} length
 */
function getRandomString(length) {
    return Math.random().toString(36).substr(2, length).split("").join(".");
}
var ActionTypes = {
    INIT() {
        return `@@redux/INIT${getRandomString(6)}`;
    },
    UNKNOWN() {
        return `@@redux/PROBE_UNKNOWN_ACTION${getRandomString(6)}`;
    },
};

/**
 * 判断某个对象是否是一个plain-object
 * @param {*} obj
 */
function isPlainObject(obj) {
    if (typeof obj !== "object") {
        return false;
    }
    return Object.getPrototypeOf(obj) === Object.prototype;
}

/**
 * 实现createStore的功能
 * @param {function} reducer reducer
 * @param {any} defaultState 默认的状态值
 */
function createStore (reducer, defaultState) {
    let currentReducer = reducer, //当前使用的reducer
    currentState = defaultState; //当前仓库中的状态
    const listeners = []; //记录所有的监听器（订阅者）
    function dispatch(action) {
        //验证action
        if (!isPlainObject(action)) {
            throw new TypeError("action must be a plain object");
        }
        //验证action的type属性是否存在
        if (action.type === undefined) {
            throw new TypeError("action must has a property of type");
        }
        currentState = currentReducer(currentState, action);
        //运行所有的订阅者（监听器）
        for (const listener of listeners) {
            listener();
        }
    }
    function getState() {
        return currentState;
    }
    /**
     * 添加一个监听器（订阅器）
     */
    function subscribe(listener) {
        listeners.push(listener); //将监听器加入到数组中
        let isRemove = false; //是否已经移除掉了(取消监听)
        return function () {
            if (isRemove) {
                return;
            }
            //将listener从数组中移除
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
            isRemove = true;
        };
    }
    //创建仓库时，需要分发一次初始的action
    dispatch({
        // type: `@@redux/INIT${getRandomString(7)}`
        // 抽离：
        type: ActionTypes.INIT
    });
    return {
        dispatch,
        getState,
        subscribe
    };
}

function bindActionCreators (actionCreators, dispatch) {
    if (typeof actionCreators === "function") {
        //传入的是函数
        return getAutoDispatchActionCreator(actionCreators, dispatch);
    }
    else if (typeof actionCreators === "object") {
        //传入的是对象
        const result = {}; //返回结果
        for (const key in actionCreators) {
            if (actionCreators.hasOwnProperty(key)) {
                const actionCreator = actionCreators[key]; //取出对应的属性值
                if (typeof actionCreator === "function") {
                    // 最好验证一下
                    // 验证传递的是啥，只有传递是函数的时候才分发
                    result[key] = getAutoDispatchActionCreator(actionCreator, dispatch);
                }
            }
        }
        return result;
    }
    else {
        throw new TypeError("actionCreators must be an object or function which means action creator");
    }
}
/**
 * 得到一个自动分发的action创建函数
 */
function getAutoDispatchActionCreator(actionCreator, dispatch) {
    return function (...args) {
        // 新的函数把原函数增强
        //   参数不固定
        const action = actionCreator(...args);
        dispatch(action); // 自动分发
    };
}

function validateReducers(reducers) {
    if (typeof reducers !== "object") {
        throw new TypeError("reducers must be an object");
    }
    if (!isPlainObject(reducers)) {
        throw new TypeError("reducers must be a plain object");
    }
    //验证 reducer 的返回结果是不是undefined，不能是undefined
    for (const key in reducers) {
        if (reducers.hasOwnProperty(key)) {
            const reducer = reducers[key]; //拿到reducer
            //传递一个特殊的type值
            let state = reducer(undefined, {
                type: ActionTypes.INIT(),
            });
            if (state === undefined) {
                throw new TypeError("reducers must not return undefined");
            }
            // 再次触发
            state = reducer(undefined, {
                type: ActionTypes.UNKNOWN(),
            });
            if (state === undefined) {
                throw new TypeError("reducers must not return undefined");
            }
        }
    }
}
function combineReducers (reducers) {
    //1. 验证
    validateReducers(reducers);
    /**
     * 返回的是一个reducer函数
     */
    return function (state = {}, action) {
        const newState = {}; //要返回的新的状态
        for (const key in reducers) {
            if (reducers.hasOwnProperty(key)) {
                const reducer = reducers[key];
                newState[key] = reducer(state[key], action); //调用reducer
            }
        }
        return newState; //返回状态
    };
}

// 函数式编程
/**
 *
 * @param  {...any} funcs
 * @returns 返回新的函数
 */
function compose(...funcs) {
    // if (funcs.length === 0) {
    //   return (args) => args; //如果没有要组合的函数，则返回的函数原封不动的返回参数
    // } else if (funcs.length === 1) {
    //   //要组合的函数只有一个
    //   return funcs[0];
    // }
    // return funcs.reduce(
    //   (a, b) =>
    //     (...args) =>
    //       a(b(...args)) //前面的调用(后面的函数的结果)
    // );
    return function (...args) {
        let lastReturn = null; //记录上一个函数返回的值，它将作为下一个函数的参数
        for (let i = funcs.length - 1; i >= 0; i--) {
            const func = funcs[i];
            if (i === funcs.length - 1) { //数组最后一项
                lastReturn = func(...args);
            }
            else {
                lastReturn = func(lastReturn);
            }
        }
        return lastReturn;
    };
}

/**
 * 注册中间件
 * @param  {...any} middlewares 所有的中间件
 */
function applyMiddleware (...middlewares) {
    return function (createStore) {
        //给我创建仓库的函数
        //下面的函数用于创建仓库
        return function (reducer, defaultState) {
            //创建仓库
            const store = createStore(reducer, defaultState);
            // 官方代码给了他一个默认函数
            let dispatch = () => {
                throw new Error("目前还不能使用dispatch");
            };
            const simpleStore = {
                // 中间件本身是一个函数，该函数接收一个store参数，表示创建的仓库，该仓库并非一个完整的仓库对象，仅包含getState，dispatch。该函数运行的时间，是在仓库创建之后运行。
                getState: store.getState,
                // dispatch: store.dispatch
                // 错误原因：这里的dispatch指向的是最原始的dispatch，
                dispatch: (...args) => dispatch(...args),
            };
            //给dispatch赋值
            //根据中间件数组，得到一个dispatch创建函数的数组
            //   [logger1, logger2]----> [dispatch创建函数1， dispatch创建函数2]
            const dispatchProducers = middlewares.map((mid) => mid(simpleStore)); //调用中间件就会拿到dispatch创建函数
            //   反向调用数组
            dispatch = compose(...dispatchProducers)(store.dispatch);
            return Object.assign(Object.assign({}, store), { dispatch });
        };
    };
}

export { applyMiddleware, bindActionCreators, combineReducers, compose, createStore };
