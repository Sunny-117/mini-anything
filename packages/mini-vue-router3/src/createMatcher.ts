import createRouteMap from './createRouteMap';

function createMatcher(routes) {
	console.log(routes);
	// matcher 有两个功能
	// 1. 添加路由 在原有的路由的基础上动态添加路由

	// 2. 匹配,根据路径匹配路由

	let { pathMap } = createRouteMap(routes);
	console.log('================================', pathMap); // 一个路径对应一条记录

	function addRoutes(routes) {
		createRouteMap(routes, pathMap);
	}

	function match(path) {
		console.log(path);
	}

	return {
		addRoutes,
		match,
	};
}

export default createMatcher;
