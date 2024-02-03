
import { describe, vi, beforeEach, test, expect } from 'vitest'
import { SyncWaterfullHook } from '../core/SyncWaterfullHook.js'


class SyncWaterfullHookDemo {
    constructor() {
        this.hooks = {
            arch: new SyncWaterfullHook(['name']),
        }
    }

    tap() {
        this.hooks.arch.tap('vite', (name) => {
            console.log(`vite-${name}`)
            return 'vite=finished->'
        })
        this.hooks.arch.tap('react', (data) => {
            console.log(`webpack-${data}`)
        })
    }

    start() {
        this.hooks.arch.call('sunny-117')
    }
}

const l = new SyncWaterfullHookDemo();

describe('SyncWaterfullHook', () => {
    beforeEach(() => {
        l.tap();
    });

    test('start method should call all taps and print correct messages', () => {
        // 测试 start 方法是否正确调用所有监听函数并输出正确的消息
        const consoleSpy = vi.spyOn(console, 'log')
        l.start();
        expect(consoleSpy).toHaveBeenCalledTimes(2);
        expect(consoleSpy).toHaveBeenNthCalledWith(1, 'vite-sunny-117');
        expect(consoleSpy).toHaveBeenNthCalledWith(2, 'webpack-vite=finished->');
        consoleSpy.mockRestore();
    });
});
