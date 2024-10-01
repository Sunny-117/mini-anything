// 同步的方法
let {SyncBailHook} = require('tapable');
// Bail保险 熔断型的
// 核心就是发布订阅
class Lesson {
  constructor(){
    this.hooks = {
      arch: new SyncBailHook(['name','age']) // 限制绑定函数的参数
    }
  }
  tap(){ // 希望调用这个方法来在钩子上注册事件
    this.hooks.arch.tap('node', function (name) { // 第一个参数是注释作用 没有实际意义
      console.log('node', name);
      return false; // 如果当前函数有返回值则不会继续执行
    });
    this.hooks.arch.tap('react', function (name) {
      console.log('react', name);
    });
  }
  start(){
    this.hooks.arch.call('jw');
  }
}
let l = new Lesson();
l.tap();
l.start();