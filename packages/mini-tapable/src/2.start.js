let {AsyncSeriesWaterfallHook} = require('tapable');
// AsyncSeriesBailHook
// tapable (compose + promise + asyncCallback)
// webpack
let h = new AsyncSeriesWaterfallHook(['name']);
// tapAsync tapPromise
h.tapAsync('node',function (name,cb) {
  setTimeout(() => {
    console.log('node');
    cb(null,'我饿了');
  }, 1000);
});
h.tapAsync('react', function (data, cb) {
  setTimeout(() => {
    console.log('react', data);
    cb();
  },2000);
});

h.callAsync('jw',function () {
  console.log('end');
});