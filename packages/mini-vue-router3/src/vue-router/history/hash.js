import Base from './base';

// 确保有hash值
function ensureSlash() {
	if (window.location.hash) {
		// 取hash有兼容问题
		return;
	}
	window.location.hash = '/';
}
class Hash extends Base {
	constructor(router) {
		super(router);
		ensureSlash();
	}
	getCurrentLocation() {
		return window.location.hash.slice(1);
	}
	setupListener() {
		// hash值就是监控hash的变化
		window.addEventListener('hashchange', () => {
			console.log(this.getCurrentLocation());
			this.transitionTo(this.getCurrentLocation(), () => {
				console.log('[ 111111 ] >', 111111)
			});
		});
	}
}

export default Hash;
