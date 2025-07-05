import axios from "axios";
import type { AxiosInstance } from "axios";
import type { ApiRequestInterceptors, ApiRequestConfig } from "./type";
import { ElLoading } from "element-plus";
import { LoadingInstance } from "element-plus/es/components/loading/src/loading";

const DEFAULT_LOADING = true; // 默认显示加载动画

class ApiRequest {
  instance: AxiosInstance;
  interceptors?: ApiRequestInterceptors;
  showLoading?: boolean; // 是否显示加载动画，默认为true
  loading?: LoadingInstance;

  constructor(config: ApiRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);

    // 保存基本信息
    this.interceptors = config.interceptors || {};
    this.showLoading = config.showLoading ?? DEFAULT_LOADING; // 如果config中没有提供showLoading，则设为默认值

    // 使用拦截器
    // 1. 从config中获取拦截器并添加到实例中，如果config中没有提供拦截器，则使用默认的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 2. 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log("所有实例的请求拦截器");

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "加载中...",
            background: "rgba(0, 0, 0, 0.5)"
          });
        }
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

        // 关闭加载动画
        this.loading?.close();

        if (res.data.code !== 200) {
          console.error("响应数据错误", res.data);
        }
        return res.data;
      },
      (err) => {
        console.error("所有实例的响应拦截器错误", err);

        // 关闭加载动画
        this.loading?.close();

        // 处理特定的错误状态码
        switch (err.response?.status) {
          case 401:
            console.log("401错误，请检查请求的权限");
            break;
          case 403:
            console.log("403错误，禁止访问");
            break;
          case 500:
            console.log("500错误，服务器内部错误");
            break;
          case 502:
            console.log("502错误，网关错误");
            break;
          case 503:
            console.log("503错误，服务不可用");
            break;
          case 504:
            console.log("504错误，网关超时");
            break;
          case 400:
            console.log("400错误，请检查请求参数");
            break;
          case 404:
            console.log("404错误，请检查请求的URL是否正确");
            break;
          default:
            console.log(`未知错误：${err.response?.status}`);
        }
        return Promise.reject(err);
      }
    );
  }

  request<T>(config: ApiRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1. 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config as any);
      }
      // 2. 判断是否需要展示loading
      // 如果config中有showLoading，则使用config中的值，否则使用默认值
      if (config.showLoading === false || config.showLoading === true) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((response) => {
          // 1. 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            response = config.interceptors.responseInterceptor(response);
          }
          // 2. 重置showLoading为默认值，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING;
          // 3. 将结果resolve返回出去
          resolve(response);
        })
        .catch((error) => {
          // 重置showLoading为默认值，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING;
          reject(error);
          return error;
        });
    });
  }

  get<T>(config: ApiRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "get" });
  }

  post<T>(config: ApiRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "post" });
  }

  delete<T>(config: ApiRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "delete" });
  }

  patch<T>(config: ApiRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "patch" });
  }
}

export default ApiRequest;
