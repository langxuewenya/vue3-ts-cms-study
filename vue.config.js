const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",

  css: {
    loaderOptions: {
      less: {
        additionalData: `@import "@/assets/css/variables.less";`
      }
    }
  },

  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        // target: "http://121.40.22.189:8000",
        // target: "https://mock.apipost.net/mock/4b8769a15ce1000",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    }
  }
});
