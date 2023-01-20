
//1.设置环境变量为开发模式
process.env.NODE_ENV  = 'development';
//2.得到配置文件的工厂
const configFactory = require('../config/webpack.config');
const config = configFactory('development');
//3.创建compiler
const webpack = require('webpack');
const compiler = webpack(config);
const chalk = require('chalk');
//4.获取devServer的配置对象
const createDevServerConfig = require('../config/webpackDevServer.config');
const serverConfig = createDevServerConfig();
const WebpackDevServer = require('webpack-dev-server');
/**
 * 1.内部会启动compiler的编译
 * 2.会启动一个HTTP服务器并返因编译后的结果 
 */
const devServer = new WebpackDevServer(compiler,serverConfig);
//启动一个HTTP开发服务器，监听3000端口
devServer.listen(3000,()=>{
    console.log(chalk.cyan('Starting the development server'));
});
