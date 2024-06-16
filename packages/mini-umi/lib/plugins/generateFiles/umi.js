let {readFileSync} = require('fs');
let {join} = require('path');
let writeTmpFile = require('../../writeTmpFile');
let Mustache = require('mustache');// handlebar  ejs jade 
const plugin = (pluginAPI)=>{
    //监听一个事件，生成文件了
    pluginAPI.onGenerateFiles(async ()=>{
       const umiTpl = readFileSync(join(__dirname,'umi.tpl'),'utf8');
       let content = Mustache.render(umiTpl);
       writeTmpFile({
           path:'umi.js',
           content
       });
    });
}
module.exports = plugin;