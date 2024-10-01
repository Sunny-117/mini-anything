// let {AsyncSerieslHook} = require('tapable');
class AsyncParallelHook{
  constructor(){
    this.tasks = [];
  }
  tapAsync(name,task){
    this.tasks.push(task);
  }
  callAsync(...args){ // express 中的中间件的原理
    let finalCallback = args.pop();
    let index = 0;
    let next = ()=>{ // compose
      if (index === this.tasks.length) return finalCallback();
      let task = this.tasks[index++];
      task(...args,next);
    }
    next();
  }
}
let hook = new AsyncSerieslHook(['name']);
hook.tapAsync('node',function (name,cb) {
  setTimeout(() => {
    console.log('node');
    cb('错误');
  }, 1000);
});
hook.tapAsync('react', function (name,cb) {
  setTimeout(() => {
    console.log('react');
    cb();
  }, 1000);
});

hook.callAsync('jw',function () {
  console.log('all')
});