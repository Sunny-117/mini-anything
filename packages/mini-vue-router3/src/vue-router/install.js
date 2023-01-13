// 为了保证VueRouter内部不需要依赖于Vue,用户在使用插件时可以传入
const install = function (Vue) {
	// install的作用就是将我们的router实例共享给每个组件

	// 把所有的方法都和组件初始化的时候进行混合
	// 只是将这个router挂载到了每个组件上
	Vue.mixin({
		beforeCreate() {
			console.log('[ this ] >', this)
			// console.log('beforeCreate', this.$options.name);
			// 区分父子关系
			// 先找到父亲,儿子找父亲的属性,孙子找父亲的
			// 组件的生命周期调用顺序 先父后子
			if (this.$options.router) {
				// 讲根实例放到了 _routerRoot上
				this._routerRoot = this;
				this._router = this.$options.router;

				this._router.init(this);
			} else {
				// 将根属性全部增加到了每个组件上的_routerRoot上
				// 所有的组件都可以获取_routerRoot._router获取路由的实例
				this._routerRoot = this.$options && this.$parent._routerRoot;
			}
		},
	});
};

export default install;
