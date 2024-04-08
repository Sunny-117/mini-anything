import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "./pinia";
import { persitisPlugin } from "./pinia/plugins/persitisPlugin";

const app = createApp(App);
const pinia = createPinia();

pinia.use(persitisPlugin());

app.use(pinia);
app.mount("#app");
