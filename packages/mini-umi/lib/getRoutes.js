const { absPagesPath } = require('./getPaths');
const { join, basename, extname, resolve, relative } = require('path');
const { existsSync, readdirSync, statSync } = require('fs');
const { winPath } = require('./utils');
/**
 * 
 * @param {} opts pages 根目录，这是定死的，不会变的
 * @param {} opts relDir 代表一个子目录
 */
function getRoutes(opts = {}) {
    const { root, relDir = "" } = opts;
    const files = getFiles(join(root, relDir));//获取此目录下面的所有的文件列表
    const routes = files.reduce(fileToRouteReducer.bind(null, opts), []);
    return routes;
}
/**
 * 把文件转成路由的处理器 profile.js=>{
            "path": "/profile",
            "exact": true,
            "component": require('@/pages/profile.js').default
        }
   routes 正在累加的数组   
   file 一个个的文件  
 */
function fileToRouteReducer(opts, routes, file) {
    const { root, relDir = "" } = opts;
    //当前文件的绝对路径=pages+""+index.js
    //add.js的绝对路径=pages/user/add.js
    const absFile = join(root, relDir, file);
    const stats = statSync(absFile);//获取 一个路径的文件的信息
    if (stats.isDirectory()) {//如果这是一个目录
        const relFile = join(relDir, file);// user
        let layoutFile = join(root, relFile, '_layout.js');
        const route = {
            path: normalizePath(relFile),
            routes: getRoutes({
                ...opts,
                relDir: relFile//user
            })
        }
        if (existsSync(layoutFile)) {
            //@/pages/user/_layout.js
            route.component = toComponentPath(root, layoutFile)
        }
        routes.push(route);
    } else {//就是文件
        //file=profile.js   profile.js,.js=>profile
        let fileName = basename(file, extname(file));//profile
        routes.push({
            path: normalizePath(join(relDir, fileName)),
            exact: true,
            component: toComponentPath(root, absFile)
        });
    }
    return routes;
}
function normalizePath(path) {
    path = winPath(path);
    path = `/${path}`;
    // /index=>/    /user/index => /user
    path = path.replace(/\/index$/, '/');
    return path;
}
function toComponentPath(root, absFile) {
    //resolve(root,'..') resolve(pages绝对路径,'..')=src的绝对路径
    //relative(C:\aproject\zf-umi3\src,C:\aproject\zf-umi3\src\pages\profile.js)
    // @/pages\profile.js  == @/pages/profile.js
    //路径分隔符window \ mac linux / .webpack统一成/
    return `@/${winPath(relative(resolve(root, '..'), absFile))}`;
}
function getFiles(root) {
    if (!existsSync(root)) return [];//如果此目录不存在，则返回空数组
    return readdirSync(root).filter(file => {
        if (file.charAt(0) === '_' || file.charAt(0) === '.') return false;//凡是以_开头的文件都不是路由文件，都会忽略 
        return true;
    });
}
let routes = getRoutes({ root: absPagesPath });

module.exports = routes;