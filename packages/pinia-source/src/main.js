import { createApp } from 'vue'
import App from './App.vue'

import {createPinia} from './pinia/createPinia'


const app = createApp(App)
const pinia = createPinia() //pinia对象
//注册pinia
app.use(pinia) //use会调用当前对象中的一个函数属性 install
app.mount('#app')