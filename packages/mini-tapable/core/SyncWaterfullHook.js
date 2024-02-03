export class SyncWaterfullHook {
  constructor(args) {
    this._tasks = []
  }

  tap(name, task) {
    this._tasks.push(task)
  }

  call(...args) {
    let [first, ...rest] = this._tasks;
    const ret = first(...args)
    rest.reduce((last, next) => {
      return next(last)
    }, ret)
  }
}
