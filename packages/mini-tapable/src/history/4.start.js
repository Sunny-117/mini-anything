let {SyncLoopHook} = require('tapable');
// 某个监听事件 如果返回了值 这个方法会再次执行，只有返回undefined这个方法才会停止执行
class Lesson {
  constructor(){
    this.index = 0;
    this.hooks = {
      arch: new SyncLoopHook(['name','age']) 
    }
  }
  tap(){ 
    this.hooks.arch.tap('node',  (name) => { 
      console.log('node', name);
      return ++this.index == 3?undefined:'再来一次'
    });
    this.hooks.arch.tap('react',  (data) =>{
      console.log('react', data);
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