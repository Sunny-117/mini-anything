const {SyncLoopHook} = require("./src");
const hook = new SyncLoopHook(["name"]);
let counter=0;
//不是只传名称，而是传对象
hook.tap({context: true,name:"1"}, (context,name) => {
  context[counter] = counter;
  console.log(1, context,name);
  if(++counter >= 2){
    return;
  }
  return true;
});


hook.intercept({
    context: true,
    loop(context){//每次循环执行此拦截器
       console.log('loop',context);
    }
}) 
hook.call('zhufeng');