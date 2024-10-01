

let Hook = require('./Hook');
const HookCodeFactory = require('./HookCodeFactory');
class AsyncParallelHookCodeFactory extends HookCodeFactory{
    content({onDone}){
        //并行
        return this.callTapsParallel({onDone})
    }
}
let factory = new AsyncParallelHookCodeFactory();
class AsyncParallelHook extends Hook{
    compile(options) {
        factory.setup(this,options);
        return factory.create(options);
	}
}
module.exports = AsyncParallelHook;
/**
(function anonymous(name, age, _callback) {
    var _x = this._x;
    var _counter = 3;//计数器3个回调函数，或者说3个任务
    var _done = function () {
        _callback();
    };

    var _fn0 = _x[0];
    _fn0(name, age, function () {
        if (--_counter === 0) _done();
    });

    var _fn1 = _x[1];
    _fn1(name, age, function (_err1) {
        if (--_counter === 0) _done();
    });

    var _fn2 = _x[2];
    _fn2(name, age, function (_err2) {
        if (--_counter === 0) _done();
    });
});
 */