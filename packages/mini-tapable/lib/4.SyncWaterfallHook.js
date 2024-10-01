const {SyncWaterfallHook} = require('tapable');
//表示如果上一个回调函数返回结果不为undefined,则会作为下一个回调函数的第一个参数
const clickHook = new SyncWaterfallHook(['name','age']);

clickHook.tap('1',(name,age)=>{
    console.log(1,name,age);
    return 'jiagou';

});
clickHook.tap('2',(name,age)=>{
    console.log(2,name,age);
});
clickHook.tap('3',(name,age)=>{
    console.log(3,name,age);
});
clickHook.call('Sunny',10);

