// let {AsyncParralleHook} = require('tapable');

// 绑定事件的三种方式 tap 绑定同步 tapAsync 异步的 tapPromise
//                  call         callAsync      promise
class AsyncParralleHook {
  constructor() {
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) { // express 中的中间件的原理
   let promises = this.tasks.map(task=>task());
   return Promise.all(promises)
  }
}
let hook = new AsyncParralleHook(['name']);
hook.tapPromise('node', function (name) {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log('node');
      resolve();
    }, 1000);
  })
});
hook.tapPromise('react', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react');
      resolve();
    }, 1000);
  })
});
hook.promise('jw').then(function () {
  console.log('all')
});