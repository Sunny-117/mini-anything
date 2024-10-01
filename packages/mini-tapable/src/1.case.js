class AsyncSeriesHook {
  constructor() {
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) { 
    let [first,...others] = this.tasks;
    return others.reduce((p,n)=>{
      return p.then(()=>n()); // 把所有的promise串连起来
    }, first(...args));
  }
}
let hook = new AsyncSeriesHook(['name']);
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