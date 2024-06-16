let { readFileSync } = require('fs');
let { join } = require('path');
let writeTmpFile = require('../../writeTmpFile');
let Mustache = require('mustache');// handlebar  ejs jade 
const plugin = (pluginAPI) => {
    //监听一个事件，生成文件了
    pluginAPI.onGenerateFiles(async () => {
        const historyTpl = readFileSync(join(__dirname, 'history.tpl'), 'utf8');
        let content = Mustache.render(historyTpl);
        writeTmpFile({
            path: 'core/history.js',
            content
        });
    });
}
module.exports = plugin;