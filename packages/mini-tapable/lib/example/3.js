
let call = CALL_DELEGATE;
function CALL_DELEGATE(...args) {
    call = ()=>{
        console.log('这是动态创建出来的call方法');
    }
};
call();
call();
call();
call();
/**
 * 1.为了性能
 * 2.只能这么实现
 */