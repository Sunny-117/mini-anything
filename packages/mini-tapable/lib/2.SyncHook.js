const {SyncHook} = require('tapable');
const hook = new SyncHook(['name','age']);
//当hook刚创建的时候，call已经有了。此时编译也没有用
//tap就是存放回调函数
debugger
hook.tap('1',(name,age)=>{
    console.log(1,name,age);
});
hook.tap({name:'2'},(name,age)=>{
    console.log(2,name,age);
});
hook.tap('3',(name,age)=>{
    console.log(3,name,age);
});
//执行回调函数
hook.call('Sunny',10);
hook.tap('4',(name,age)=>{
    console.log(4,name,age);
});
hook.call('jiagou',20);
/**
 * tapable是在因为优化方法 懒编译
 * 
(function anonymous(name, age) {
var _x = this._x;

var _fn0 = _x[0];
_fn0(name, age);

var _fn1 = _x[1];
_fn1(name, age);

var _fn2 = _x[2];
_fn2(name, age);
})
 */
