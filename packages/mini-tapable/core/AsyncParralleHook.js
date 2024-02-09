export class AsyncParalleHook {
    constructor(args) {
        this.tasks = []
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        let finalCallback = args.pop()
        let index = 0
        const done = () => {
            index++;
            if (index === this.tasks.length) {
                finalCallback()
            }
        }
        this.tasks.forEach(task => {
            task(...args, done)
        })
    }
}