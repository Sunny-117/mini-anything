import { createActions, createCommitFn, createGetters, createMutations, createDispatchFn } from "./creators";
import { reactive, inject } from 'vue'

class Store {
    constructor(options) {
        const {
            state,
            getters,
            mutations,
            actions
        } = options
        const store = this;
        const { commit, dispatch } = store;
        store._state = reactive({ data: state })
        // 这样设计的目的：
        // 如果reactive(state)
        // replaceState=>store._state.data 不需要给整体reactive一遍
        store._mutations = Object.create(null) //没有原型链
        store._actions = Object.create(null)

        createMutations(store, mutations)
        createActions(store, actions)
        createGetters(store, getters)

        createCommitFn(store, commit)
        createDispatchFn(store, dispatch)
    }
    get state() {
        return this._state.data
    }
    commit(type, payload) {
        // console.log(this)// undefined 因为用的时候直接解构会破坏this指向
        // 解决：
        // 1. es7直接 commit=(type, payload)=> 打包会大
        // 2. vuex写法：实例上定义commit和dispatch
        this._mutations[type](payload)
    }
    dispatch(type, payload) {
        this._actions[type](payload)
    }
    install(app) {
        console.log('[ this ] >', app)
        app.provide('store', this)
        app.config.globalProperties.$store = this;
    }
}
export function createStore(options) {
    return new Store(options)
}
export function useStore() {
    return inject('store')
}