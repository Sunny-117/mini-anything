import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import * as sagaEffects from "./saga"
import { createHashHistory } from "history"
import { connectRouter, routerMiddleware } from "connected-react-router"

/**
 * 创建dva对象的函数
 * @param {*} opts 配置
 */
export default function (opts = {}) {
    var app = {
        model,
        _models: [], //记录已经定义的模型
        router,
        _router: null, //用于记录路由函数
        start,
        use
    }
    let options = getOptions();
    return app;

    /**
    * 使用dva插件
    * @param {*} plugin 配置对象
    */
    function use(plugin) {
        options = { ...options, ...plugin }
    }

    function getOptions() {
        const options = {
            history: opts.history || createHashHistory(),
            initialState: opts.initialState === undefined ? {} : opts.initialState,
            onError: opts.onError || (() => { }),
            onStateChange: opts.onStateChange || (() => { }),
            onReducer: opts.onReducer || (reducer => (state, action) => reducer(state, action)),
            onEffect: opts.onEffect,
            extraReducers: opts.extraReducers || {},
            extraEnhancers: opts.extraEnhancers || []
        }

        if (opts.onAction) {
            options.onAction = Array.isArray(opts.onAction) ? opts.onAction : [opts.onAction];
        } else {
            options.onAction = [];
        }
        return options;
    }

    /**
     * 根据模型对象定义一个模型
     * @param {*} modelObj 
     */
    function model(modelObj) {
        app._models.push(modelObj);
    }

    /**
     * 传入一个路由函数，该函数返回路由配置
     * @param {*} routerFunc 
     */
    function router(routerFunc) {
        app._router = routerFunc;
    }

    function start(selector) {
        const store = getStore();
        //运行注册的 subscriptions
        runSubScriptions(store.dispatch);
        render(selector, store);
    }

    /**
     * 运行注册函数
     */
    function runSubScriptions(dispatch) {
        for (const model of app._models) {
            const newDispatch = function (action) {
                dispatch(getNewAction(action, model));
            }
            if (model.subscriptions) {
                for (const prop in model.subscriptions) {
                    var func = model.subscriptions[prop];
                    func({
                        dispatch: newDispatch,
                        history: options.history
                    })
                }
            }
        }
    }

    /**
     * 将action的类型绑定到模型
     * @param {*} action 
     * @param {*} model 
     */
    function getNewAction(action, model) {
        let newAction = action;
        if (!action.type.includes("/")) { //如果没有加入命名空间，将当前对象的命名空间加上
            newAction = {
                ...action,
                type: `${model.namespace}/${action.type}`
            }
        }
        return newAction;
    }

    function getMiddlewares() {
        const sagaMid = createSagaMiddleware();
        getMiddlewares.runSaga = function (store) {
            const arr = [];//保存副作用函数的数组
            for (const model of app._models) {
                const put = function (action) { //改造put方法，让它与模型关联
                    return sagaEffects.put(getNewAction(action, model))
                }
                if (model.effects) {
                    for (const prop in model.effects) {
                        arr.push({
                            type: `${model.namespace}/${prop}`,
                            generatorFunc: model.effects[prop],
                            put,
                            model
                        })
                    }
                }
            }
            sagaMid.run(function* () {
                for (const item of arr) {
                    let func = function* (action) {
                        try {
                            yield item.generatorFunc(action, { ...sagaEffects, put: item.put });
                        }
                        catch (err) {
                            options.onError(err, store.dispatch)
                        }
                    }
                    //该函数可以被进一步封装
                    if (options.onEffect) {
                        let oldEffect = func;
                        func = options.onEffect(oldEffect, sagaEffects, model, item.type)
                    }
                    yield sagaEffects.takeEvery(item.type, func)
                }
            })
        }
        const mids = [routerMiddleware(options.history), sagaMid, ...options.onAction];
        return composeWithDevTools(applyMiddleware(...mids));
    }

    /**
     * 得到一些额外的reducer，会合并到根reducer中去
     */

    function getExtraReducers() {
        return {
            router: connectRouter(options.history),
            /* eslint-disable */
            ["@@dva"](state = 0, action) {
                return state;
            },
            ...options.extraReducers
        }
    }

    /**
     * 得到一个redux仓库
     */
    function getStore() {
        //根据模型，得到一个根的reducer
        let rootReducerObj = {};
        for (const model of app._models) {
            //将模型转换为reducer
            var obj = getReducer(model);
            rootReducerObj[obj.name] = obj.reducer;
        }
        rootReducerObj = { ...rootReducerObj, ...getExtraReducers() }
        let rootReducer = combineReducers(rootReducerObj);
        let oldReducer = rootReducer;
        //封装了onStateChange的reducer
        rootReducer = function (state, action) {
            const newState = oldReducer(state, action);
            options.onStateChange(newState);
            return newState;
        }
        //进一步封装onReducer
        const oldReducer2 = rootReducer;
        rootReducer = options.onReducer(oldReducer2);

        const newCreateStore = options.extraEnhancers.reduce((fn1, fn2) => {
            return fn2(fn1);
        }, createStore)

        const store = newCreateStore(rootReducer,
            options.initialState,
            getMiddlewares())

        //运行saga
        getMiddlewares.runSaga(store);
        window.store = store;
        return store;
    }

    /**
     * 根据一个模型，得到一个reducer
     */
    function getReducer(model) {
        const actionTypes = []; //要匹配的action类型
        if (model.reducers) {
            for (const prop in model.reducers) {
                actionTypes.push({
                    type: `${model.namespace}/${prop}`, //要匹配的action类型
                    reducer: model.reducers[prop] //要运行的reducer函数
                });
            }
        }
        const reducerObj = {
            name: model.namespace,
            reducer(state = model.state, action) {
                const temp = actionTypes.find(t => t.type === action.type);
                if (temp) {
                    //运行对应的函数
                    return temp.reducer(state, action);
                }
                else {
                    return state;
                }
            }
        }
        return reducerObj
    }

    /**
     * 渲染
     * @param {*} selector 
     */
    function render(selector, store) {
        const routerConfig = app._router({
            history: options.history,
            app
        });
        const root = <Provider store={store}>
            {routerConfig}
        </Provider>
        ReactDOM.render(root, document.querySelector(selector));
    }
}