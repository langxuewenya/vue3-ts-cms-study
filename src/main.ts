import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { globalRegister } from "./global";
// import ApiRequest from "./api/index";

import "normalize.css"; // 引入样式重置
import "./assets/css/index.less"; // 引入全局样式

const app = createApp(App);

app.use(globalRegister); // 使用全局注册函数
app.use(store);
app.use(router);

app.mount("#app");

// interface DataType {
//   data: any;
//   returnCode: string;
//   success: boolean;
// }

// ApiRequest.request<DataType>({
//   url: "/book",
//   method: "get",
//   interceptors: {
//     requestInterceptor: (config: any) => {
//       console.log("单独请求拦截器");
//       return config;
//     },
//     responseInterceptor: (response: any) => {
//       console.log("单独响应拦截器");
//       return response;
//     }
//   }
// }).then((res) => {
//   console.log("请求结果", res, res.returnCode, res.success);
// });
// setTimeout(() => {
//   ApiRequest.get<DataType>({
//     url: "/get",
//     showLoading: false
//   });
// }, 3000);
