"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    login() {
      common_vendor.index.login({
        provider: "weixin",
        success: function(loginRes) {
          console.log("cg");
          common_vendor.index.getUserInfo({
            provider: "weixin",
            success: function(infoRes) {
              console.log("用户昵称为：" + infoRes.userInfo.nickName);
            }
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.login && $options.login(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Project/Vue/uniapp-vue3-ui-master/pages/index/wxlogin.vue"]]);
wx.createPage(MiniProgramPage);
