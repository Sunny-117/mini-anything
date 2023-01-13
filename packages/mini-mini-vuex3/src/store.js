import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex); // install 方法
export default new Vuex.Store({
  modules:{ // 可以给状态划分模块   递归
    a:{
      state:{
        count:200
      },
      mutations:{
        change(state){
          console.log('----')
        }
      },
      modules:{
        b:{
          state:{
            count:3000
          }
        }
      }
    },
   
  },
  state: {
    count:100
  },
  getters:{
    newCount(state){ // 200
      return state.count + 100;
    }
  },
  mutations: {
    change(state){
      // this => store
      console.log('xxxxx')
      state.count+=10
    }
  },
  actions: {
    change({commit}){
      setTimeout(()=>{
        commit('change');
      },1000);
    }
  }
})
