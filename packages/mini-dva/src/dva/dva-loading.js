const NAMESCPECE = "loading"; //默认命名空间名是loading
const SHOW = "@@DVA_LOADING/SHOW";
const HIDE = "@@DVA_LOADING/HIDE";

export default function (opts = {}) {
    const namespace = opts.namespace || NAMESCPECE

    const initialState = {
        global: false,
        models: {},
        effects: {}
    }

    function reducer(state = initialState, action) {
        const { namespace, actionType } = action.payload || {};
        switch (action.type) {
            case SHOW:
                return {
                    global: true,
                    models: {
                        ...state.models, //保留其他模型的加载状态
                        [namespace]: true
                    },
                    effects: {
                        ...state.effects,
                        [actionType]: true
                    }
                };
            case HIDE:
                const models = {
                    ...state.models, //保留其他模型的加载状态
                    [namespace]: false
                };
                const effects = {
                    ...state.effects,
                    [actionType]: false
                };
                const global = Object.keys(models).some(key => models[key])
                return {
                    global,
                    models,
                    effects
                };
            default:
                return state;
        }
    }

    function onEffect(oldEffect, { put }, model, actionType) {
        console.log(model)
        return function* (action) {
            yield put({
                type: SHOW,
                payload: {
                    namespace: model.namespace,
                    actionType
                }
            })
            yield oldEffect(action);
            yield put({
                type: HIDE,
                payload: {
                    namespace: model.namespace,
                    actionType
                }
            })
        }
    }

    return {
        extraReducers: {
            [namespace]: reducer
        },
        onEffect
    }
}