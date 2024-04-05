<script setup lang="ts">
import { inject, toRefs } from "vue";
import { useCounterStore } from "./stores/composition";
import { PiniaSymbol } from "./pinia/rootState";

const store = useCounterStore();
const { count, double } = toRefs(store);
console.log(count, double);
console.log(store);
console.log(inject(PiniaSymbol));
</script>
<template>
  <div>计数器：{{ store.count }}</div>
  <button @click="store.increment(2)">点击</button>
  <div>双倍：{{ store.double }}</div>
</template>

<style scoped></style>
./stores/counter-options./stores/composition
