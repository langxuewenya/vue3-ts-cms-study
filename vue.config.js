const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      "/api": {
        target: "https://mock.apipost.net/mock/4b8769a15ce1000",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    }
  }
});
