import type {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from "axios";

// 自定义请求拦截器的类型
export interface ApiRequestInterceptors {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}

// 扩展AxiosRequestConfig，添加自定义的拦截器
export interface ApiRequestConfig extends AxiosRequestConfig {
  interceptors?: ApiRequestInterceptors;
}
