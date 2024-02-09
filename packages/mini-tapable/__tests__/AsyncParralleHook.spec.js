import { describe, vi, expect, beforeEach, test } from 'vitest'
import { AsyncParalleHook } from '../core/AsyncParralleHook';


class AsyncParalleHookDemo {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new AsyncParalleHook(['name'])
        }
    }
    tap() {
        this.hooks.arch.tapAsync('node', (name, cb) => {
            // setTimeout(() => {
            console.log('node', name)
            cb()
            // }, 1000)
        })
        this.hooks.arch.tapAsync('react', (data, cb) => {
            // setTimeout(() => {
            console.log('react', data)
            cb()
            // }, 1000);
        })
    }
    start() {
        this.hooks.arch.callAsync('Sunny', function () {
            console.log('end')
        })
    }
}


const l = new AsyncParalleHookDemo();
describe('SyncBailHookDemo', () => {
    beforeEach(() => {
        l.tap();
    });

    test('start method should call all taps and print correct messages', () => {
        // 测试 start 方法是否正确调用所有监听函数并输出正确的消息
        const consoleSpy = vi.spyOn(console, 'log')
        l.start();
    });
});
