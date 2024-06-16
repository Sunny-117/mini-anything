
function winPath(path){
    // \ /
    return path.replace(/\\/g,'/');
}
exports.winPath  =winPath;