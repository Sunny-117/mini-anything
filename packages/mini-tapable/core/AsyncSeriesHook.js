export class AsyncSeriesHook {
  constructor() {
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    let [first, ...others] = this.tasks;
    return others.reduce((p, n) => {
      return p.then(() => n());
    }, first(...args));
  }
}