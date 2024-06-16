
// patchRoutes 运行时插件实现
export function patchRoutes({ routes }) {
  routes.unshift({
    path: '/foo',
    exact: true,
    component: require('@/foo').default
  });
}
