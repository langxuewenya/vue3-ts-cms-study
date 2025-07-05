import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { globalRegister } from "./global";
import ApiRequest from "./api/index";

const app = createApp(App);

app.use(globalRegister); // 使用全局注册函数
app.use(store);
app.use(router);

app.mount("#app");

ApiRequest.request({
  url: "",
  method: "get",
  interceptors: {
    requestInterceptor: (config: any) => {
      console.log("单独请求拦截器");
      return config;
    },
    responseInterceptor: (response: any) => {
      console.log("单独响应拦截器");
      return response;
    }
  }
});
ApiRequest.request({
  url: "",
  method: "get"
});
