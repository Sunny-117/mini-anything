import { SyncHook } from './core/SyncHook.js'
import { describe, vi, expect, beforeEach, test } from 'vitest'


class SyncHookDemo {
    constructor() {
        this.hooks = {
            arch: new SyncHook(['name']),
        }
    }

    tap() { // 注册监听函数
        this.hooks.arch.tap('vite', (name) => {
            console.log(`vite-${name}`)
        })
        this.hooks.arch.tap('react', (name) => {
            console.log(`webpack-${name}`)
        })
    }

    start() {
        this.hooks.arch.call('sunny-117')
    }
}

const l = new SyncHookDemo();

describe('SyncHookDemo', () => {
    beforeEach(() => {
        l.tap();
    });

    test('start method should call all taps and print correct messages', () => {
        // 测试 start 方法是否正确调用所有监听函数并输出正确的消息
        const consoleSpy = vi.spyOn(console, 'log')
        l.start();
        expect(consoleSpy).toHaveBeenCalledTimes(2);
        expect(consoleSpy).toHaveBeenNthCalledWith(1, 'vite-sunny-117');
        expect(consoleSpy).toHaveBeenNthCalledWith(2, 'webpack-sunny-117');
        consoleSpy.mockRestore();
    });
});
