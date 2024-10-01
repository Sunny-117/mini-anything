let { AsyncParallelHook } = require("../tapable2");
let asyncParallelHook = new AsyncParallelHook(["name", "age"]);
console.time("cost");
asyncParallelHook.tapAsync("1", function (name, age, callback) {
  setTimeout(function () {
    console.log(1, name, age);
    callback();
  }, 1000);
});
asyncParallelHook.tapAsync("2", function (name, age, callback) {
  setTimeout(function () {
    console.log(2, name, age);
    callback();
  }, 2000);
});
asyncParallelHook.tapAsync("3", function (name, age, callback) {
  setTimeout(function () {
    console.log(3, name, age);
    callback();
  }, 3000);
});
asyncParallelHook.callAsync("Sunny", 10, () => {
  console.timeEnd("cost");
});