import { ref } from "vue";
import { PiniaSymbol } from "./rootState";

export function createPinia() {
  const state = ref({});
  const _p: any = [];
  const pinia = {
    install(app) {
      app.config.globalProperties.$pinia = pinia;
      app.provide(PiniaSymbol, pinia);
    },
    state,
    _s: new Map(),
    use(plugin: any) {
      _p.push(plugin);
      return this;
    },
    _p,
  };
  return pinia;
}
