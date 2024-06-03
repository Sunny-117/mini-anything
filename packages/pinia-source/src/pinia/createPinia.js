import {piniaSymbol} from './piniaSymbol'

export function createPinia(){
    const piniaStore = {
        _stores: new Map(),//存放所有store对象的位置
        //state:{},//初始化一个state对象，后续会完成计算属性和对象的使用

        //专用于提供给use进行注册的方法，只要在use中放入了piniaStore对象，则会自动调用install操作，app实例对象
        install(app){
            //将当前的app实例对象进行全局化注册，全局化方法有2中写法，1）注入注册操作provide-inject,2)config.globalProperties
            // 注入注册操作时可以在vue3中对所有组件开发使用
            app.provide(piniaSymbol,piniaStore) //这样就可以让vue3的所有组件都可以使用通过app.inject("key")完成访问到注如的piniaStore
            //还可以作为全局属性使用，vue2
            app.config.globalProperties.$pinia = piniaStore //这样就能让vue2的组件实例也可以共享piniaStore

            console.log("createPinia正常运行");
        }
    }

    return piniaStore
}