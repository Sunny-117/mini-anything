export class SyncBailHook {
  constructor(args) {
    this._tasks = []
  }

  tap(name, task) {
    this._tasks.push(task)
  }

  call(...args) {
    for (let i = 0; i < this._tasks.length; i++) {
      const res = this._tasks[i](...args)
      if (res !== undefined) {
        return res
      }
    }
  }
}
