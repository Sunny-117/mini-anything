import { computed, ref } from "vue";
import { defineStore } from "../pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);

  const double = computed(() => count.value * 2);

  const increment = async (payload: number) => {
    return new Promise((res: Function, rej: Function) => {
      setTimeout(() => {
        count.value += payload;
        if (Math.random() > 0.5) {
          res();
        } else {
          rej("失败了");
        }
      }, 1000);
    });
  };

  return {
    count,
    double,
    increment,
  };
});
