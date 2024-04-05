import { reactive } from "vue";
import { callSetup } from "../utils";

export function createSetupStore(id: string, setup, pinia) {
  const store = reactive({});
  callSetup(id, setup, store, pinia);
}
