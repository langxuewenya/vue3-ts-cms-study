// api统一出口

import ApiRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

export default new ApiRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 拦截器
  interceptors: {
    // 请求成功拦截器
    requestInterceptor: (config) => {
      return config;
    },
    // 请求失败拦截器
    requestInterceptorCatch: (error) => {
      return Promise.reject(error);
    },
    // 响应成功拦截器
    responseInterceptor: (response) => {
      return response;
    },
    // 响应失败拦截器
    responseInterceptorCatch: (error) => {
      return Promise.reject(error);
    }
  }
});
