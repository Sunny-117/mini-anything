# target.hasOwnProperty 不能用in

在 Vue 3 响应式源码 `deleteProperty` 这个位置，**必须使用 `hasOwnProperty` 而不能使用 `in`**，主要是因为 `in` 和 `hasOwnProperty` 在处理 **原型链** 和 `Reflect.deleteProperty` 交互时的不同表现。

---

### **`hasOwnProperty` vs `in` 的区别**
1. **`hasOwnProperty(key)`**
   - 只检查 **自身** 是否具有该属性，不检查原型链。
   - `Object.prototype.hasOwnProperty.call(obj, key)` 是最安全的用法，避免 `obj` 可能被 `Object.create(null)` 创建而导致 `hasOwnProperty` 访问失败。

2. **`key in obj`**
   - 既检查 **自身** 也检查 **原型链** 是否有该属性。
   - 适用于 `for...in` 遍历或原型链查找，但在判断属性是否真正属于对象本身时不可靠。

---

### **Vue 响应式源码为什么必须用 `hasOwnProperty`**
**`deleteProperty(target, key)` 逻辑：**
- `Reflect.deleteProperty(target, key)` 试图删除 `target` 自身的 `key`，如果删除成功，返回 `true`。
- 只有 `target` 自身的属性被删除，才需要触发 `trigger` 更新。

#### **如果用 `in` 可能引发错误**
1. **当 `key` 来自原型链**
   - `in` 仍然会返回 `true`，即使 `target` 自身没有 `key`，导致误判：
     ```js
     const obj = Object.create({ a: 1 }); // 原型上有 'a'
     console.log('a' in obj); // true
     console.log(obj.hasOwnProperty('a')); // false
     ```
   - `Reflect.deleteProperty(target, 'a')` 不会删除原型上的 `a`，但 `a in obj` 仍然为 `true`，导致 Vue 误以为删除成功并触发 `trigger`，实际上 `a` 还在原型上。

2. **删除成功但仍在原型链上**
   - 例如：
     ```js
     const proto = { foo: 1 };
     const obj = Object.create(proto);
     obj.foo = 2;

     Reflect.deleteProperty(obj, 'foo'); // 删除了 obj.foo
     console.log('foo' in obj); // true (因为 proto.foo 仍然存在)
     console.log(obj.hasOwnProperty('foo')); // false (确保自身属性被删除)
     ```
   - 如果用 `in`，会误以为 `foo` 仍然存在，从而不会触发 `trigger`，导致 UI **不会更新**。

#### **总结**
- `Reflect.deleteProperty(target, key)` **只能删除自身属性**，不会影响原型链。
- `hasOwnProperty` 只检查自身属性，确保**真正属于 `target` 的 key 被删除**才触发 `trigger`。
- `in` 会检查原型链，可能导致：
  1. **错误触发 `trigger`**（原型链上有相同属性）
  2. **不触发 `trigger`**（自身属性被删除但原型链上仍然有）

---

### **Vue 代码为什么这样设计**
```js
if (target.hasOwnProperty(key) && res) {
  trigger(target, TriggerOpTypes.DELETE, key);
}
```
- **确保 `key` 真的属于 `target`**，而不是原型链上的属性。
- **避免 `trigger` 误触发**，只有 `target` **原本有 `key`，且删除成功** 才触发更新。

用 `in` 可能导致：
1. **误触发**（原型链上有属性）
2. **不触发**（删除后 `in` 仍然 `true`）

所以这里**必须用 `hasOwnProperty`**！