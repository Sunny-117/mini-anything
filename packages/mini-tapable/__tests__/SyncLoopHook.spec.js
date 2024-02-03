import { describe, vi, expect, beforeEach, test } from 'vitest'
import { SyncLoopHook } from '../core/SyncLoopHook'

class SyncLoopHookDemo {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new SyncLoopHook(['name', 'age'])
    }
  }
  tap() {
    this.hooks.arch.tap('node', (name) => {
      console.log('node-' + name);
      return ++this.index == 3 ? undefined : '再来一次'
    });
    this.hooks.arch.tap('react', (data) => {
      console.log('react-' + data);
    });
    this.hooks.arch.tap('webpack', function (data) {
      console.log('webpack-' + data);
    });
  }
  start() {
    this.hooks.arch.call('Sunny-117');
  }
}

const l = new SyncLoopHookDemo();

describe('SyncLoopHookDemo', () => {
  beforeEach(() => {
    l.tap();
  });

  test('start method should call all taps and print correct messages', () => {
    // 测试 start 方法是否正确调用所有监听函数并输出正确的消息
    const consoleSpy = vi.spyOn(console, 'log')
    l.start();
    expect(consoleSpy).toHaveBeenCalledTimes(5);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'node-Sunny-117');
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'node-Sunny-117');
    expect(consoleSpy).toHaveBeenNthCalledWith(3, 'node-Sunny-117')
    expect(consoleSpy).toHaveBeenNthCalledWith(4, 'react-Sunny-117')
    expect(consoleSpy).toHaveBeenNthCalledWith(5, 'webpack-Sunny-117')
    consoleSpy.mockRestore();
  });
});
