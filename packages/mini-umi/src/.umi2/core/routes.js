
export function getRoutes() {
    const routes = [
        {
            "path": "/",//路径
            "exact": true,///是否精确匹配
            "component": require('@/pages/index.js').default//要渲染的组件 @ src路径别名
        },
        {
            "path": "/profile",
            "exact": true,
            "component": require('@/pages/profile.js').default
        },
        {
            "path": "/user",
            "routes": [
                {
                    "path": "/user/add",
                    "exact": true,
                    "component": require('@/pages/user/add.js').default
                },
                {
                    "path": "/user/list",
                    "exact": true,
                    "component": require('@/pages/user/list.js').default
                }
            ],
            "component": require('@/pages/user/_layout.js').default
        }
    ];
    return routes;
}