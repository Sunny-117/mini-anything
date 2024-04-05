import { defineStore } from "../pinia";

interface CounterState {
  count: number;
}

interface CounterGetters {
  double: number;
}

interface CounterAction {
  increment(payload: any): void;
}

export const useCounterStore = defineStore("counter", {
  state: (): CounterState => {
    return {
      count: 0,
    };
  },
  getters: {
    double(): CounterGetters["double"] {
      return this.count * 2;
    },
  },
  actions: {
    increment(payload: number) {
      this.count += payload;
    },
  },
});
