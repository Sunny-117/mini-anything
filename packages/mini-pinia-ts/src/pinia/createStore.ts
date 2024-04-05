import { ref } from "vue";
import { PiniaSymbol } from "./rootState";

export function createPinia() {
    const state = ref({})
    const pinia = {
        install(app) {
            app.config.globalProperties.$pinia = pinia;
            app.provide(PiniaSymbol, pinia)
        },
        state,
        _s: new Map()
    }
    return pinia;
}