class SyncBailHook{ // 同步的钩子
  constructor(args) { // args 起一个限制作用
    this.tasks = [];
  }
  tap(name,task){
    this.tasks.push(task);
  }
  call(...args){
    let index = 0; // 取任务队列中的第一个
    let ret;
    do{ // 至少做一次
      ret = this.tasks[index++](...args);
    }while(ret === undefined && index < this.tasks.length)
  }
}
let hook = new SyncBailHook(['name']);
hook.tap('node',function (name) {
  console.log('node',name);
 // return '停一停有事'
}); // tap用来注册事件的 events.on 
hook.tap('react', function (name) {
  console.log('react', name);
}); 
hook.call('jw');