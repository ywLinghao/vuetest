"use strict";
const common_vendor = require("../../common/vendor.js");
const http_home = require("../../http/home.js");
require("../../http/axios.js");
require("../../store/user.js");
const _sfc_main = {
  data() {
    return {
      searchValue: "",
      bgcolor: "#e43d33",
      frontColor: "#ffffff",
      type: "bottom",
      categories: []
      // 用于存储文章分类数据
    };
  },
  onLoad() {
    common_vendor.index.setNavigationBarColor({
      backgroundColor: this.bgcolor,
      frontColor: this.fontColor
    });
    http_home.articleCatsData.fetchData().then(() => {
      this.categories = http_home.articleCatsData.categories;
    });
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    navigateToCategory(id, catName) {
      common_vendor.index.navigateTo({
        url: `/pages/index/categoryDetail?id=${id}&catName=${catName}`
      });
    },
    search(e) {
      console.log(e);
    },
    scroll(e) {
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.bgcolor,
    b: common_vendor.o($options.search),
    c: common_vendor.o(($event) => $data.searchValue = $event),
    d: common_vendor.p({
      ["cancel-button"]: "none",
      focus: true,
      modelValue: $data.searchValue
    }),
    e: $data.categories.length > 0
  }, $data.categories.length > 0 ? {
    f: common_vendor.f($data.categories, (category, k0, i0) => {
      return {
        a: common_vendor.t(category.catName),
        b: category.id,
        c: common_vendor.o(($event) => $options.navigateToCategory(category.id, category.catName), category.id)
      };
    })
  } : {}, {
    g: common_vendor.o((...args) => $options.scroll && $options.scroll(...args)),
    h: common_vendor.p({
      type: $data.type
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Project/Vue/uniapp-vue3-ui-master/pages/index/wiki.vue"]]);
wx.createPage(MiniProgramPage);
