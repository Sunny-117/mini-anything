import { defineStore } from '../pinia/index'

export const useStore = defineStore("stroeId", {
    state: () => {
        return {
            name: 'jack chen',
            age: 40
        }
    },
    actions:{
        increment(num){
            //获取state返回对象数据
            console.log(this.age + num)
            return this.age + num
        }
    },
    getters:{
        doubleAge:(state)=>state.age * 2, //计算属性的操作
        show:(state)=>{
            console.log(state.age)
            return state.age+1
        }
    }
})
