import { computed, getCurrentInstance, inject, isReactive, reactive, isRef } from 'vue'
import { piniaSymbol } from './piniaSymbol'

/**
 * defineStore接受三种传参方式
 * 第一种是传入id+options
 * 第二种是只传入options(而id包含在这个options内部),options是对象
 * 第三种是传入id+setup函数
 */

export function defineStore(idOrOptions, optionsOrSetup) {
    //单独定义id和Options
    let id, options
    //接受和处理第一个参数,id:string,options:object
    if (typeof idOrOptions == "string") {
        id = idOrOptions
        options = optionsOrSetup  //对象或函数
    } else {
        options = idOrOptions //对象
        id = options.id
    }

    //返回函数
    function useStore() {
        //当前组件实例是否存在
        const instance = getCurrentInstance() //获取当前组件实例
        let piniaStore = instance && inject(piniaSymbol)// 如果当前组件实例存在就注入整个piniaStore(因为只有在vue组件里才可以使用inject)
        if (!piniaStore._stores.has(id)) {//如何在piniastore的map中没有对应的id，则表示需要新建，如果已经存在则只需要返回数据
            //录入新的数据（state,actions,getters）包含的对象一起放入map中
            //id不存在则添加的是options数据
            if (typeof optionsOrSetup === "function") {//传入进来的是一个函数
                //将对应的id里的opints，放置到piniaStroe
                createSetupStore(id, optionsOrSetup, piniaStore) //函数形式
            } else {//前两种传参方式都用这个来结构store
                //将对应的id里的opints，放置到piniaStroe
                createOptionsStore(id, options, piniaStore) //对象形式
            }
        }
        return piniaStore._stores.get(id) //获取目前use的这个store

        // let piniaStore = {
        //     ...options
        // }
        //return piniaStore
    }

    return useStore //用户使用这个函数就能获取 store实例对象

}
//处理函数式defineStore
function createSetupStore(id, setup, piniaStore) {
    //建立一个，将来返回数据的响应式对象
    const store = reactive({})
    //执行setup函数
    const setupStore = setup()
    //遍历一个store里所有的属性，做进一步处理  setup(){const name=ref(10),const fun=()=>{},const abc=computed() , return{}}
    for (let key in setupStore) {
        const prop = setupStore[key]
        //判断prop
        if (typeof prop == 'function') {
            //改变函数的指向问题
            setupStore[key] = wrapAction(prop)
        }
        //处理state
        // if ((isRef(prop) && !isComputed(prop)) || isReactive(prop)) {
        //     //如果它是ref或者是reactive则说明他是state（注意由于computed也是ref，所以要排除计算属性）
        //     if (!isOption) {//如果是setup函数，则把里面的state也存到全局state中去
        //         piniaStore.state[key] = prop
        //     }
        // }
    }

    //判断计算属性，ref，同时也是一个effect
    // function isComputed(v) {
    //     return isRef(v) && v.effect
    // }

    function wrapAction(action) {
        return function () {
            let ret = action.apply(store, arguments)
            return ret
        }
    }

    Object.assign(store, setupStore)
    piniaStore._stores.set(id, store)
}




/**defineStore传入了options时调用这个函数 （感觉传入options就是为了迎合vue2的写法）*/
function createOptionsStore(id, options, piniaStore) {
    //id：key
    //options：{state}
    //piniaStore:{_stores}
    const { state, actions, getters } = options //解构当前的对象数据
    //console.log(actions);  //{()=>{}}

    function setup() {//专门处理store里的state,actions,getters
        //piniaStore.state[id] = state ? state() : {} //将解构出的state存入到state对象中，如果state存在则直接运行函数，如果state不存在则创建一个新的对象    
        //const localState = piniaStore.state[id] //处理state的数据
        const localState = state ? state() : {}

        //actions(直接解构就可以得到)
        //getters
        //getters
        //1. 将获取到的属性，编程计算属性computed
        //2. 将设定好的计算属性和state和actions放在一个对象中
        //3. 放入进去是一定是一个计算属性格式
        //["doubleAge","show"]


        //return localState
        return Object.assign(localState, actions, Object.keys(getters).reduce((computedGetters, name) => {  //computedGetters:{doubleAge:computed(()=>{})}
            computedGetters[name] = computed(() => {
                //获取当前store的指向
                let store = piniaStore._stores.get(id)
                return getters[name].call(store, store)
            })
            return computedGetters
        }, {})) //返回的数据就是actions合并到localState对象中了
    }
    createSetupStore(id, setup, piniaStore, true)

    // 将setup函数完成的内容直接放置在_store的man对象中
    piniaStore._stores.set(id, setup())
}
