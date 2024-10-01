const { AsyncParallelBailHook } = require('tapable');
//有一个任务返回值不为空就直接结束
//对于promise来说不，就是resolve的值不为空
//如果reject失败了，不影响流程
const hook = new AsyncParallelBailHook(['name', 'age']);
console.time('cost');

 hook.tapPromise('1', (name, age) => {
   return new Promise(function(resolve,reject){
        setTimeout(() => {
            console.log(1, name, age);
            resolve();
        }, 1000);
   });
});
//只有有一个任务resolve或者reject一个值，不管成功失败都会结束
hook.tapPromise('2', (name, age) => {
    return new Promise(function(resolve,reject){
        setTimeout(() => {
            console.log(2, name, age);
            reject('失败');
        }, 2000);
   });
});
hook.tapPromise('3', (name, age) => {
    return new Promise(function(resolve,reject){
        setTimeout(() => {
            console.log(3, name, age);
            resolve();
        }, 3000);
   });
}); 
//Promise.all();
hook.promise('Sunny', 10).then((result) => {
    console.log(result);
    console.timeEnd('cost');
});
/*
hook.tapAsync('1', (name, age, callback) => {
    setTimeout(() => {
        console.log(1, name, age);
        callback();
    }, 1000);
});
hook.tapAsync('2', (name, age,callback) => {
    setTimeout(() => {
        console.log(2, name, age);
        callback('结果');
    }, 2000);
});
hook.tapAsync('3', (name, age,callback) => {
    setTimeout(() => {
        console.log(3, name, age);
        callback();
    }, 3000);
});
hook.callAsync('Sunny', 10, (err) => {
    console.log(err);
    console.timeEnd('cost');
}); 
*/
/* hook.tap('1',(name,age)=>{
    console.log(1,name,age);
});
hook.tap('2',(name,age)=>{
    console.log(2,name,age);
});
hook.tap('3',(name,age)=>{
    console.log(3,name,age);
});
hook.callAsync('Sunny',10,(err)=>{
    console.log(err);
    console.timeEnd('cost');
}); */
