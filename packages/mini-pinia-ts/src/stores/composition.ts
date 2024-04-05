import { computed, ref } from "vue";
import { defineStore } from "../pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);

  const double = computed(() => count.value * 2);

  const increment = (payload: number) => (count.value += payload);

  return {
    count,
    double,
    increment,
  };
});
