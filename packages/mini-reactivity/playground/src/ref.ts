import {effect, ref} from 'vue'

const state = ref(1)

effect(()=>{
    console.log('effect', state.value)
})

state.value++