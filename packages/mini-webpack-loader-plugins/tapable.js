import { SyncHook, AsyncParallelHook } from 'tapable'
class List {
    getRoutes() {

    }
}
class Car {

    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newSpeed']),
            brake: new SyncHook(),
            calculateRoutes: new AsyncParallelHook([
                'source',
                'target',
                'routesList'
            ])
        }
    }
    setSpeed(newSpeed) {
        // call调用 触发事件
        this.hooks.accelerate.call(newSpeed)
    }
    useNavigationSystemPromise(source, target) {
        const routesList = new List()
        return this.hooks.calculateRoutes.promise(source, target, routesList).then(res => {
            console.log('useNavigationSystemPromise')
            return routesList.getRoutes()
        })
    }
}
// 1. 事件注册

const car = new Car()
car.hooks.accelerate.tap("test1", (speed) => {
    console.log('accelerate', speed)
})
car.hooks.calculateRoutes.tapPromise('test2 promise', (source, target, routerList) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('--------tapPromise', source, target)
            resolve()
        }, 0);
    })
})
// 2. 事件触发

car.setSpeed(10)

car.useNavigationSystemPromise(['1', '2', '3'], 1)