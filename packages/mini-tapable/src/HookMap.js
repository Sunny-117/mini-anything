class HookMap {
    constructor(factory) {
      this._map = new Map();
      this._factory = factory;
    }
    get(key) {
      return this._map.get(key);
    }
    tapAsync(key, options, fn) {
      return this.for(key).tapAsync(options, fn);
    }
    tapPromise(key, options, fn) {
      return this.for(key).tapPromise(options, fn);
    }
    for(key) {
      const hook = this.get(key);
      if (hook) return hook;
      let newHook = this._factory();
      this._map.set(key, newHook);
      return newHook;
    }
  }
  module.exports = HookMap;