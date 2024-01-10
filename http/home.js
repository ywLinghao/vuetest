// http/home.js
import axios from './axios';
import { useUserStore } from '@/store/user';

const articleCatsData = {
  categories: [], // 用于存储文章分类数据

  fetchData() {
    const userStore = useUserStore();
    const token = userStore.token;
    return axios.get('/api/articleCat/all', {
      headers: {
        'Accept': '*/*',
        'token': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => {
      console.log('响应数据:', response.data); // 打印响应数据
      // 使用数组的filter方法筛选符合条件的分类数据
      const filteredCategories = response.data.articleCats.filter(category => category.showInNav === true);
      if (Array.isArray(filteredCategories)) {
        this.categories = filteredCategories; // 存储文章分类数据
      } else {
        console.error('响应数据格式不正确');
      }
    })
    .catch(error => {
      console.error('请求失败', error);
    });
  },
  
};

export default articleCatsData;
