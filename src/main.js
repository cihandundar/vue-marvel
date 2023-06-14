import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/main.scss";
import store from "./store";
createApp(App).use(router).mount("#app");

new Vue({
  // ...
  store, // Vuex Store'ı ana Vue instance'ına ekliyoruz
});
