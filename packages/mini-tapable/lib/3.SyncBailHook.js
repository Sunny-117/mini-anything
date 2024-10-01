const {SyncBailHook} = require('tapable');
//当回调函数返回非undefined的值 的时候会停止后续调用
const clickHook = new SyncBailHook(['name','age']);

clickHook.tap('1',(name,age)=>{
    console.log(1,name,age);
});
clickHook.tap('2',(name,age)=>{
    console.log(2,name,age);
    return null;
});
clickHook.tap('3',(name,age)=>{
    console.log(3,name,age);
});
clickHook.call('Sunny',10);

