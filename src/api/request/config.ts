let BASE_URL = ""; // 基础请求路径
const TIME_OUT = 10000; // 请求超时时间

// 根据不同的环境设置基础请求路径
if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://httpbin.org";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://httpbin.org/pro";
} else if (process.env.NODE_ENV === "test") {
  BASE_URL = "http://httpbin.org/test";
}

export { BASE_URL, TIME_OUT };
