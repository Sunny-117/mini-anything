class Base {
	constructor(router) {
		// @ts-ignore
		this.router = router;
	}
	transitionTo(location, handler) {
		// 根据路径match出对应的记录
		console.log(location);
		handler && handler();
	}
}

export default Base;
