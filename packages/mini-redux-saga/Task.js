export class Task {
    constructor(next, cbObj) {
        this.next = next;
        this.cbObj = cbObj;
        this.cbObj.callback = () => {
            //结束了
            this.resolve && this.resolve();
        }
    }
    /**
     * 取消当前任务
     */
    cancel() {
        this.next(null, null, true);// isOver 设置为 true
    }

    /**
     * 将当前的task转换为一个promise对象
     */
    toPromise() {
        return new Promise(resolve => {
            this.resolve = resolve;
        })
    }
}