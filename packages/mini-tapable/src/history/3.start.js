// 同步的方法
let {SyncWaterfallHook} = require('tapable');
// 瀑布的意思就是上一个监听函数的结果是下一个人的输入
class Lesson {
  constructor(){
    this.hooks = {
      arch: new SyncWaterfallHook(['name','age']) 
    }
  }
  tap(){ // 希望调用这个方法来在钩子上注册事件
    this.hooks.arch.tap('node', function (name) { 
      console.log('node', name);
      return 'node学的不错'
    });
    this.hooks.arch.tap('react', function (data) {
      console.log('react', data);
      return  'react 更好'
    });
    this.hooks.arch.tap('webpack', function (data) {
      console.log('webpack', data);
    });
  }
  start(){
    this.hooks.arch.call('jw');
  }
}
let l = new Lesson();
l.tap();
l.start();