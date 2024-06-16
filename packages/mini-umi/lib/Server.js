let express = require('express');
let http = require('http');
let webpack = require('webpack');
const { join } = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
const { absTmpPath, absSrcPath } = require('./getPaths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//我们需要写一个webpack中间件，打包并预览我们的项目
class Server {
    constructor() {
        this.app = express();
    }
    setupDevMiddleware() {
        webpackConfig.entry = join(absTmpPath, 'umi.js');
        webpackConfig.resolve.alias['@'] = absSrcPath;
        webpackConfig.plugins.push(new HtmlWebpackPlugin({
            template: join(__dirname, 'index.html')
        }));
        const compiler = webpack(webpackConfig);
        //默认是放在内存里的
        const devMiddleware = webpackDevMiddleware(compiler, {
            writeToDisk: true
        });
        //产出dist/main.js dist/index.html 
        this.app.use(devMiddleware);
        this.app.use((req, res, next) => {
            //不管fs.readFileSync fs memory-fs
            res.send(compiler.outputFileSystem.readFileSync(join(__dirname, 'dist/index.html'), 'utf8'));
        });
        return devMiddleware;
    }
    async start() {
        const devMiddleware = this.setupDevMiddleware();
        devMiddleware.waitUntilValid(() => {
            let listeningApp = http.createServer(this.app);
            listeningApp.listen(8000, () => {
                console.log('服务已经在8000端口上启动了!');
            });
        });
    }
}
module.exports = Server;