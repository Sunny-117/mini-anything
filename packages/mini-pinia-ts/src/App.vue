<script setup lang="ts">
import { inject, toRefs } from "vue";
import { useCounterStore } from "./stores/composition";
import { PiniaSymbol } from "./pinia/rootState";
import { storeToRefs } from "./pinia";

const store = useCounterStore();
const { count, double } = toRefs(store);
console.log(count, double);
console.log(store);
console.log(inject(PiniaSymbol));

// toRefs会把函数也转成ref，所以提供了storeToRefs
console.log(1, storeToRefs(store));
console.log(2, toRefs(store));

function patch() {
  // 单次修改 多次
  // store.count++;
  // store.count++;
  // store.count++;
  // 单次修改 一次
  // 方法1
  // store.$patch({ count: 10 }); // react setState
  // 方法2
  store.$patch((state: any) => {
    state.count++;
    state.count++;
    state.count++;
  });
}
function reset() {
  store.$reset(); // 拿到默认的state方法 执行一次获取默认值，覆盖掉所有状态（仅支持options api）
}
// 只要状态变化了，就会触发
store.$subscribe((mutations, state) => {
  console.log(mutations, state);
});
store.$onAction(({ after, onError }) => {
  // 大多数action是一个promise
  after(() => {
    console.log(store.count);
  });
  after(() => {
    console.log(store.count);
  });
  onError((e) => {
    console.warn(e);
  });
});
</script>
<template>
  <div>计数器：{{ store.count }}</div>
  <button @click="store.increment(2)">点击</button>
  <div>双倍：{{ store.double }}</div>
  <button @click="patch()">同时多次修改状态</button>
  <button @click="reset">reset</button>
</template>

<style scoped></style>
