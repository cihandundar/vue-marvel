import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; // Vuex Store'u içeri aktarın
import "./styles/main.scss";

const app = createApp(App);

app.use(router);
app.use(store); // Vuex Store'u kullan

app.mount("#app");
