module.exports = {
  devServer: {
    proxy: {
      "/mobile-report": {
        //本地服务接口地址
        target: "http://10.190.182.96:16106",
        changeOrigin: true
      },
    },
  },
};
