"use strict";
const common_vendor = require("../common/vendor.js");
const instance = common_vendor.axios.create({
  baseURL: "https://api.jqrjq.cn/",
  // 请求基地址，例如：https://api.jqrjq.cn/
  timeout: 6e3
  // 请求超时时间，单位为毫秒
});
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err.response.data);
  }
);
exports.instance = instance;
