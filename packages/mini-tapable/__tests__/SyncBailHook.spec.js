
import { describe, vi, expect, beforeEach, test } from 'vitest'
import { SyncBailHook } from '../core/SyncBailHook'


class SyncBailHookDemo {
    constructor() {
        this.hooks = {
            arch: new SyncBailHook(['name']),
        }
    }

    tap() {
        this.hooks.arch.tap('vite', (name) => {
            console.log(`vite-${name}`)
            return '后续将不再执行了'
        })
        this.hooks.arch.tap('react', (name) => {
            console.log(`webpack-${name}`)
        })
    }

    start() {
        this.hooks.arch.call('sunny-117')
    }
}

const l = new SyncBailHookDemo();

describe('SyncBailHookDemo', () => {
    beforeEach(() => {
        l.tap();
    });

    test('start method should call all taps and print correct messages', () => {
        // 测试 start 方法是否正确调用所有监听函数并输出正确的消息
        const consoleSpy = vi.spyOn(console, 'log')
        l.start();
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenNthCalledWith(1, 'vite-sunny-117');
        consoleSpy.mockRestore();
    });
});
