import plugin from './plugin'
export function getRoutes() {
    const routes = {{{routes}}};
    plugin.applyPlugins({
      key:'patchRoutes',
      args:{routes}
    });
    return routes;
}