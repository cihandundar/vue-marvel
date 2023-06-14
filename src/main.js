import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; // Vuex store'umuzu import ediyoruz
import "./styles/main.scss";
createApp(App).use(router).use(store).mount("#app");
