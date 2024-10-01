class SyncWaterfallHook{ 
  constructor(args) { 
    this.tasks = [];
  }
  tap(name,task){
    this.tasks.push(task);
  }
  call(...args){
    let [first,...others] = this.tasks;
    // first就是第一个任务
    // reduce
    others.reduce((prev,next)=>{
      return next(prev);
    }, first(...args))
  }
}
let hook = new SyncWaterfallHook(['name']);
hook.tap('node',function (name) {
  console.log('node',name);
  return 'node还不错'
}); 
hook.tap('react', function (data) {
  console.log('react', data);
  return 'react ok'
}); 
hook.tap('webpack', function (data) {
  console.log('webpack', data);
}); 
hook.call('jw');