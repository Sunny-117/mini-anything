import Base from './base';
class Html5 extends Base {
	constructor(router) {
		super(router);
	}
	setupListener() {
		return window.location.pathname;
	}
	getCurrentLocation() {
		// 监控浏览器 前进后退变化
		window.addEventListener('popstate', () => {
			this.transitionTo(this.getCurrentLocation(), () => {
				console.log('[ history ] 触发>', history)
			});
		});
	}
}

export default Html5;
