const { AsyncParallelHook } = require('tapable');
const hook = new AsyncParallelHook(['name', 'age']);
console.time('cost');
/**
debugger
hook.tapAsync('1', (name, age, callback) => {
    setTimeout(() => {
        console.log(1, name, age);
        callback();
    }, 1000);
});
hook.tapAsync('2', (name, age,callback) => {
    setTimeout(() => {
        console.log(2, name, age);
        callback();
    }, 2000);
});
hook.tapAsync('3', (name, age,callback) => {
    setTimeout(() => {
        console.log(3, name, age);
        callback();
    }, 3000);
});
debugger
hook.callAsync('Sunny', 10, (err) => {
    console.log(err);
    console.timeEnd('cost');
});
 */
debugger
hook.tapPromise('1', (name, age) => {
   return new Promise(function(resolve){
        setTimeout(() => {
            console.log(1, name, age);
            resolve();
        }, 1000);
   });
});
hook.tapPromise('2', (name, age) => {
    return new Promise(function(resolve){
        setTimeout(() => {
            console.log(2, name, age);
            resolve();
        }, 2000);
   });
});
hook.tapPromise('3', (name, age) => {
    return new Promise(function(resolve){
        setTimeout(() => {
            console.log(3, name, age);
            resolve();
        }, 3000);
   });
});
debugger
hook.promise('Sunny', 10).then((result) => {
    console.log(result);
    console.timeEnd('cost');
});


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


/**
 (function anonymous(name, age) {
    var _x = this._x;
    return new Promise(function (_resolve, _reject) {
        var _counter = 3;
        var _done = function () {
            _resolve();
        };
        
        var _fn0 = _x[0];
        var _promise0 = _fn0(name, age);
        _promise0.then(
            function () {
                if (--_counter === 0) _done();
            }
        );

        var _fn1 = _x[1];
        var _promise1 = _fn1(name, age);
        _promise1.then(
            function () {
                if (--_counter === 0) _done();
            }
        );

        var _fn2 = _x[2];
        var _promise2 = _fn0(name, age);
        _promise2.then(
            function () {
                if (--_counter === 0) _done();
            }
        );
        
    });
});

 */