//动态创建函数
function fn(){

}
const fn2 = ()=>{

}

function sum(a,b){
    return a+b;
}
console.log(sum instanceof Function);
//动态创建函数然后执行
let minus = new Function("a,b","return a-b");
console.log(minus(2,1));