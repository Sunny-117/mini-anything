

const path = require('path');
const appDirectory = process.cwd();//当前的工作目录
//接收一个相对路径，返回一个从应用目录出发的绝对路径
const resolveApp = relativePath => path.resolve(appDirectory,relativePath);

module.exports = {
    appHtml:resolveApp('public/index.html'),//html模板给html-webpack-plugin用的
    appIndexJs:resolveApp('src/index.js'),//默认的入口文件
    appBuild:resolveApp('build'),//指向打包后的输出目录 webpack默认是dist
    appPublic:resolveApp('public'),
    appSrc:resolveApp('src'),
}