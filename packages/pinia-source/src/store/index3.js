import {defineStore} from '../pinia/index'
import {computed, ref} from 'vue'

export const useStore = defineStore("storedId",()=>{
    const age = ref(21)
    const name = "jack"
    function changeCounter(val){
        age.value = val
        return age.value
    }
    /* const changeCount2 = ()=>{

    } */
    //计算属性
    const age10 = computed(()=>{
        return age.value + 100
    })

    return {
        age,
        name,
        changeCounter,
        age10
    }
})