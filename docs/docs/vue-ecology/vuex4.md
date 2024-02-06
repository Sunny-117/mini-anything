# vuex 4

## Vuex 是什么？

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。


“单向数据流”理念的简单示意：

![](https://vuex.vuejs.org/flow.png)

## 从使用开始

```js
import { createApp } from 'vue'
import { createStore } from 'vuex'
// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

const app = createApp({ /* 根组件 */ })

// 将 store 实例作为插件安装
app.use(store)
```

可见，vuex 入口是通过 createStore 创建一个新的 store 实例，createStore 的参数是一个配置对象，包含了 state, getters，mutations, actions

## 实现思路

### Store 内部数据结构

```js
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
        store._mutations = Object.create(null) 
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
        this._mutations[type](payload)
    }
    dispatch(type, payload) {
        this._actions[type](payload)
    }
    install(app) {
        app.provide('store', this)
        app.config.globalProperties.$store = this;
    }
}
```

createMutations, createActions, createGetters 三者功能类似，均是往 store 上挂载 mutation, actions, getters, 以 createMutations 为例：

```js
function createMutations(store, mutations) {
    forEachValueKey(mutations, function (mutationFn, mutationKey) {
        store._mutations[mutationKey] = (payload) => {
            mutationFn.apply(store, [store.state, payload])
        }
    })
}
```

### 小细节

需要注意的一点：store._mutations 和 store._actions 对象是通过 Object.create(null) 创建的，不存在原形链

```js
store._mutations = Object.create(null) // 没有原型链
store._actions = Object.create(null) // 没有原型链
```

### 设计优化

```js
store._state = reactive({ data: state })
// 为什么不？
// store._state = reactive(state)
```

原因：API：replaceState(state: Object)，替换 store 的根状态，仅用状态合并或时光旅行调试。

当使用 replaceState，store._state.data，这样设计就不需要给整体 reactive 一遍，提升了效率

### 语法取舍

```js
// imp
class Store{
    commit(type, payload) {
        // console.log(this)// undefined 因为用的时候直接解构会破坏 this 指向
        // 解决：
        // 1. es7直接 commit=(type, payload)=> 导致打包体积增大
        // 2. vuex的做法：实例上定义commit和dispatch
        this._mutations[type](payload)
    }
}

// usage
addTodo({ commit }, text) {
    // 直接解构出来的 commit
    commit('addTodo', text)
},
```

实现代码

```js
// 实例上定义commit和dispatch
function createCommitFn(store, commit) {
    store.commit = function (type, payload) {
        commit.apply(store, [type, payload])
    }
}

function createDispatchFn(store, dispatch) {
    store.dispatch = function (type, payload) {
        dispatch.apply(store, [type, payload])
    }
}
```
