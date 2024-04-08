<script setup lang="ts">
import { inject, toRefs } from "vue";
import { useCounterStore } from "./stores/composition";
import { PiniaSymbol } from "./pinia/rootState";

const store = useCounterStore();
const { count, double } = toRefs(store);
console.log(count, double);
console.log(store);
console.log(inject(PiniaSymbol));

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
</script>
<template>
  <div>计数器：{{ store.count }}</div>
  <button @click="store.increment(2)">点击</button>
  <div>双倍：{{ store.double }}</div>
  <button @click="patch()">同时多次修改状态</button>
</template>

<style scoped></style>
