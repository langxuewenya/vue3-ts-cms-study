import axios from "axios";
import type { AxiosInstance } from "axios";
import type { ApiRequestInterceptors, ApiRequestConfig } from "./type";

class ApiRequest {
  instance: AxiosInstance;
  interceptors?: ApiRequestInterceptors;

  constructor(config: ApiRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors || {};

    // 从config中获取拦截器并添加到实例中，如果config中没有提供拦截器，则使用默认的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log("所有实例的请求拦截器");
        return config;
      },
      (err) => {
        console.error("所有实例的请求拦截器错误", err);
        return Promise.reject(err);
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        console.log("所有实例的响应拦截器");
        return res;
      },
      (err) => {
        console.error("所有实例的响应拦截器错误", err);
        return Promise.reject(err);
      }
    );
  }

  request(config: ApiRequestConfig) {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config as any);
    }
    this.instance.request(config).then((response) => {
      if (config.interceptors?.responseInterceptor) {
        response = config.interceptors.responseInterceptor(response);
      }
      console.log(response);
    });
  }
}

export default ApiRequest;
