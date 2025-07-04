import { createApp } from "vue";
import { registerApp } from "./global";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

// registerApp(app); // 全局注册

app.use(registerApp);

app.use(store);
app.use(router);

app.mount("#app");
