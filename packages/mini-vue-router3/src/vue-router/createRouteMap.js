function createRouteMap(routes, oldPathMap) {

	console.log('%c [  ]-3', 'font-size:13px; background:pink; color:#bf2c9f;', routes)
	let pathMap = oldPathMap || Object.create(null); // 没有原型链

	routes.forEach((route) => {
		addRouteRecord(route, pathMap);
	});

	return {
		pathMap,
	};
}

function addRouteRecord(route, pathMap, parent) {
	let path = parent ? `${parent.path}/${route.path}` : route.path;
	let record = {
		path,
		name: route.name,
		component: route.component,
	};
	// 根据路径匹配记录
	pathMap[path] = record;
	// 如果有儿子就递归
	if (route.children) {
		route.children.forEach((r) => {
			addRouteRecord(r, pathMap, record);
		});
	}
}

export default createRouteMap;
