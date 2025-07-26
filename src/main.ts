import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { setupStore } from "./store";

import { globalRegister } from "./global";

import "normalize.css"; // 引入样式重置
import "./assets/css/index.less"; // 引入全局样式

const app = createApp(App);

app.use(globalRegister); // 使用全局注册函数
app.use(store);
setupStore();
app.use(router);

app.mount("#app");
