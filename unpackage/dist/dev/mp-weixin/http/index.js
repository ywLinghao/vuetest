"use strict";
const http_request = require("./request.js");
const postRequest = (url, params) => {
  return http_request.request({
    url,
    method: "POST",
    data: params
  });
};
exports.postRequest = postRequest;
