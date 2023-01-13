import Vue from 'vue';
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import About from '../views/About.vue';

// 内部会调用VueRouter的install方法

/*
Vue.use = function (plugin,options) {
	plugin.install(this)
}
*/

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/about',
		name: 'About',
		component: About,
		children: [
			{
				path: 'a',
				component: {
					render() {
						return <h1>about a</h1>;
					},
				},
			},
			{
				path: 'b',
				component: {
					render() {
						return <h1>about b</h1>;
					},
				},
			},
		],
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

router.matcher.addRoutes([{ path: '/xxx', component: {}, name: 'xxx' }]);

export default router;
