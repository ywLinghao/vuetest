"use strict";
const http_axios = require("./axios.js");
const store_user = require("../store/user.js");
const articleCatsData = {
  categories: [],
  // 用于存储文章分类数据
  fetchData() {
    const userStore = store_user.useUserStore();
    const token = userStore.token;
    return http_axios.instance.get("/api/articleCat/all", {
      headers: {
        "Accept": "*/*",
        "token": token,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) => {
      console.log("响应数据:", response.data);
      const filteredCategories = response.data.articleCats.filter((category) => category.showInNav === true);
      if (Array.isArray(filteredCategories)) {
        this.categories = filteredCategories;
      } else {
        console.error("响应数据格式不正确");
      }
    }).catch((error) => {
      console.error("请求失败", error);
    });
  }
};
exports.articleCatsData = articleCatsData;
