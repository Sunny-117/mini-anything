let { AsyncParallelHook } = require('tapable');
class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }
  tap() {
    this.hooks.arch.tapAsync('react', (name, cb) => {
      setTimeout(() => {
        console.log('react', name);
        cb('出错了'); // BailHook
      }, 2000);
    });
    this.hooks.arch.tapAsync('react', (name, cb) => {
      setTimeout(() => {
        console.log('react', name);
        cb();
      }, 2000);
    });
  }
  start() {
    this.hooks.arch.callAsync('jw', function () {
      console.log('end');
    });
  }
}
let l = new Lesson();
l.tap();
l.start();
