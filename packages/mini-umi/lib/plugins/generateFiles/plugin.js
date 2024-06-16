let { readFileSync, existsSync } = require('fs');
let { join } = require('path');
let writeTmpFile = require('../../writeTmpFile');
let Mustache = require('mustache');// handlebar  ejs jade 
const { absSrcPath } = require('../../getPaths');
const { winPath } = require('../../utils');
const plugin = (pluginAPI) => {
    let plugins = [];
    if (existsSync(join(absSrcPath, 'app.js'))) {
        plugins.push(join(absSrcPath, 'app.js'));
    }
    //监听一个事件，生成文件了
    pluginAPI.onGenerateFiles(async () => {
        const pluginTpl = readFileSync(join(__dirname, 'plugin.tpl'), 'utf8');
        let content = Mustache.render(pluginTpl, {
            plugins: plugins.map((plugin, index) => {
                return {
                    index,
                    path: winPath(plugin)
                }
            })
        });
        writeTmpFile({
            path: 'core/plugin.js',
            content
        });
    });
}
module.exports = plugin;// 运行时插件，需要用esm导出