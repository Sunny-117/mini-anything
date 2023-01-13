// @ts-nocheck
import install from './install';
import createMatcher from './createMatcher';
import HashHistory from './history/hash';
import HTML5History from './history/html5';

class VueRouter {
	constructor(options) {
		this.mode = options.mode;
		// 根据路径对应映射关系
		// 需要创建一个匹配器 (核心 1. 匹配 2. 动态添加)
		this.matcher = createMatcher(options.routes || []);
		console.log('[ this.matcher ] >', this.matcher)

		switch (this.mode) {
			case 'hash':
				this.history = new HashHistory(this); // this是router实例
				break;
			case 'history':
				this.history = new HTML5History(this);
				break;
		}
	}
	// 路由的初始化
	init(app) {
		console.log(app);
		// 我们希望根据路径来跳转对应的组件
		const history = this.history;

		const setupListener = () => {
			history.setupListener(); // 每种方法监控的方式不一样
		};
		// 此方法应该属于 base
		this.history.transitionTo(history.getCurrentLocation(), setupListener);
	}
}

VueRouter.install = install;

export default VueRouter;
