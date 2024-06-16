let Server = require('../../Server');
//pluginAPI
const plugin = (pluginAPI) => {
    //注册命令
    pluginAPI.registerCommand({
        name: 'dev',
        description: '启动服务',
        fn: async function () {
            await pluginAPI.service.applyPlugins({
                key: 'onGenerateFiles'
            });
            new Server().start();
        }
    });
}
module.exports = plugin;