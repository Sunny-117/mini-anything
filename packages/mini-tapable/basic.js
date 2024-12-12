const { SyncHook } = require("./src");
let syncHook = new SyncHook(["name", "age"]);
let fn1 = (name, age) => {
  console.log(1, name, age);
}
syncHook.tap({name:'1'},fn1 );
let fn2 =  (name, age) => {
  console.log(2, name, age);
}
syncHook.tap("2",fn2);
syncHook.call("Sunny-117", 10);

/**
(function anonymous(name, age) {
    var _x = this._x;
    var _fn0 = _x[0];
    _fn0(name, age);
    var _fn1 = _x[1];
    _fn1(name, age);
})
*/