let mkdirp = require('mkdirp');//创建文件夹
let {writeFileSync} = require('fs');
let {dirname,join}= require('path');
let {absTmpPath} = require('./getPaths');
/**
 * 向临时文件夹下面写入文件
 * @param {path} 写入的文件路径 
 * @param {content} 写入的内容 
 */
function writeTmpFile({path,content}){
    //获取写入的绝对路径
    const absPath = join(absTmpPath,path);
    //保证此文件所有的文件夹是存在的，如果不存在则先建立文件夹
    mkdirp(dirname(absPath));
    //把内容写入到文件路径中去
    writeFileSync(absPath,content,'utf8');
}
module.exports = writeTmpFile;