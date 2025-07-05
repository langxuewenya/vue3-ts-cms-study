import type {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from "axios";

// 自定义请求拦截器的类型
export interface ApiRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (response: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

// 扩展AxiosRequestConfig，添加自定义的拦截器
export interface ApiRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: ApiRequestInterceptors<T>;
  showLoading?: boolean; // 是否显示加载动画
}
