
//获取 当前的工作路径 current working directory
//C:\aproject\zf-umi3
let {join} = require('path');
let {existsSync,statSync} = require('fs');
function isDirectoryAndExist(path){
    //判断某个路径的文件是否存在并且它是一个目录
    return existsSync(path) && statSync(path).isDirectory();
}
let cwd = process.cwd();
//SRC目录的绝对路径
let absSrcPath = cwd;
//如果src目录存在，那么当前目录下的src目录才是SRC根目录 
if(isDirectoryAndExist(join(absSrcPath,'src'))){
    absSrcPath=join(absSrcPath,'src');
}
const absPagesPath = join(absSrcPath,'pages');
const tmpDir = '.umi3';
const absTmpPath = join(absSrcPath,tmpDir);

module.exports = {
    absSrcPath,//SRC根目录的绝对路径 
    absPagesPath,//约定式路由 pages目录下面的文件都是路由文件
    tmpDir,//临时目录名
    absTmpPath//临时路径，绝对路径 
}