
let Vue;
class ModuleCollection { // 默认actions mutation 都会定义到store上面
    constructor(options) { // vuex [a]
        this.register([], options);
    }
    register(path, rawModule) {
        // path 是个空数组 rawModule就是个对象
        let newModule = {
            _raw: rawModule,// 对象 当前 有state getters 那个对象
            _children: {}, // 表示 他包含的模块
            state: rawModule.state // 自己模块的状态
        }
        if (path.length == 0) {
            this.root = newModule; // 根
        } else {
            // [a,b];  // reduce方法 {{a.b.c}}
            let parent = path.slice(0, -1).reduce((root, current) => {
                return root._children[current];
            }, this.root);
            parent._children[path[path.length - 1]] = newModule;
        }
        if (rawModule.modules) { // 有子模块
            forEach(rawModule.modules, (childName, module) => {
                // [a,b];
                // [a,d]
                this.register(path.concat(childName), module)
            });
        }
    }
}
// vuex 中间件  可以封装自己的逻辑  subscirbe registerModule unregisterModule
function installModule(store, rootState, path, rootModule) {
    // rootState.a = {count:200}
    // rootState.a.b = {count:3000}
    if (path.length > 0) { // [a,b]
        // 第二次 获取到的就是a对应的对象
        let parent = path.slice(0, -1).reduce((root, current) => {
            return root[current];
        }, rootState)
        // {count:1000,a:{}}
        Vue.set(parent, path[path.length - 1], rootModule.state);
    }
    if (rootModule._raw.getters) {
        forEach(rootModule._raw.getters, (getterName, getterFn) => {
            Object.defineProperty(store.getters, getterName, {
                get: () => {
                    return getterFn(rootModule.state);
                }
            });
        });
    }
    if (rootModule._raw.actions) {
        forEach(rootModule._raw.actions, (actionName, actionFn) => {
            let entry = store.actions[actionName] || (store.actions[actionName] = []);
            entry.push(() => {
                actionFn.call(store, store);
            })
        });
    }
    if (rootModule._raw.mutations) {
        forEach(rootModule._raw.mutations, (mutationName, mutationFn) => {
            let entry = store.mutations[mutationName] || (store.mutations[mutationName] = []);
            entry.push(() => {
                mutationFn.call(store, rootModule.state);
            })
        });
    }
    forEach(rootModule._children, (childName, module) => {
        installModule(store, rootState, path.concat(childName), module);
    })
}
class Store { // state getters mutations actions
    constructor(options) {
        let state = options.state; // {count:200}
        this.getters = {};
        this.mutations = {};
        this.actions = {}
        // 什么样的属性 可以实现双向 有get 和set new vue({data:{}})
        // vuex核心就是借用了vue的实例 因为vue的实例数据变化 会刷新视图
        this._vm = new Vue({
            data: {
                state
            }
        });

        // 把模块直接的关系进行整理  自己根据用户传入的参数维护了一个对象 
        // root._children=>a._children=>b
        this.modules = new ModuleCollection(options);
        //  无论是子模块 还是孙子 所有的mutation 都是根上的

        // this是store的实例 [] path this.mdoue.root 当前的根模块
        installModule(this, state, [], this.modules.root); // {_raw,_children,state}


        // if(options.getters){
        // let getters = options.getters; // {newCount:fn}
        //     forEach(getters,(getterName,getterFn)=>{
        //         Object.defineProperty(this.getters,getterName,{
        //             get:()=>{
        //                 // vue.computed实现
        //                 return getterFn(state);
        //             }
        //         })
        //     });
        // }
        // let mutations = options.mutations;
        // forEach(mutations,(mutationName,mutationFn)=>{
        //     // this.mutations.change = ()=>{ change(state)}
        //     this.mutations[mutationName] = ()=>{
        //         mutationFn.call(this,state);
        //     }
        // });
        // let actions = options.actions;
        // forEach(actions,(actionName,actionFn)=>{
        //     this.actions[actionName] = ()=>{
        //         actionFn.call(this,this);
        //     }
        // });
        let { commit, dispatch } = this;
        this.commit = (type) => {
            commit.call(this, type);
        }
        this.dispatch = (type) => {
            dispatch.call(this, type);
        }
    }
    get state() { // Object.definefineProperty get
        return this._vm.state;
    }
    commit(type) { // undefine 
        this.mutations[type].forEach(fn => fn());
    }
    dispatch(type) {
        this.actions[type].forEach(fn => fn());
    }
}

function forEach(obj, callback) {
    Object.keys(obj).forEach(item => callback(item, obj[item]));
}
let install = (_Vue) => {
    Vue = _Vue; // 保留vue的构造函数
    Vue.mixin({
        beforeCreate() {
            // 我需要把根组件中 store实例 给每个组件都增加一个$store的属性
            // 是否是根组件
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store;
            } else { // 子组件 深度优先 父－> 子 －> 孙子
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

export default {
    Store,
    install
}