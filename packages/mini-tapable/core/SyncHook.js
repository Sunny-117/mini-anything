export class SyncHook {
  constructor(args) {
    this._tasks = []
  }

  tap(name, task) {
    this._tasks.push(task)
  }

  call(...args) {
    this._tasks.forEach((task) => {
      task(...args)
    })
  }
}
