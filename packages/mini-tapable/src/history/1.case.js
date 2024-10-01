class SyncHook{ // 同步的钩子
  constructor(args) { // args 起一个限制作用
    this.tasks = [];
  }
  tap(name,task){
    this.tasks.push(task);
  }
  call(...args){
    this.tasks.forEach(task=>task(...args));
  }
}
let hook = new SyncHook(['name']);
hook.tap('node',function (name) {
  console.log('node',name);
}); // tap用来注册事件的 events.on 
hook.tap('react', function (name) {
  console.log('react', name);
}); 
hook.call('jw');