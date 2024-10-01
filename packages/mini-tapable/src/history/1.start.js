// 同步的方法
let {SyncHook} = require('tapable');

// 核心就是发布订阅
class Lesson {
  constructor(){
    this.hooks = {
      arch: new SyncHook(['name','age']) // 限制绑定函数的参数
    }
  }
  tap(){ // 希望调用这个方法来在钩子上注册事件
    this.hooks.arch.tap('node', function (name) { // 第一个参数是注释作用 没有实际意义
      console.log('node', name);
    });
    this.hooks.arch.tap('react', function (name) {
      console.log('node', name);
    });
  }
  start(){
    this.hooks.arch.call('jw');
  }
}
let l = new Lesson();
l.tap();
l.start();