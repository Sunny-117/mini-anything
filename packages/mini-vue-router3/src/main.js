import Vue from 'vue';
import App from './App.vue';
import router from './router';

// 在创建vue实例的时候,会传入vue路由的实例

Vue.config.productionTip = false;

// router 就是 new VueRouter
// this.$router
// this.$route
new Vue({
	name: 'root',
	router,
	render: (h) => h(App),
}).$mount('#app');

// 前端路由实现方式 2种实现方式
// span 单页应用, 页面不刷新,但是刷新页面
// 希望路由变化,但是不刷新页面 hash 跳转时改变hash值,并监听hash变化(缺点就是丑)

// H5 API history.pushState({}, null, '/a')
// window.addEventListener('popstate',function(){console.log(window.location.pathname)})
