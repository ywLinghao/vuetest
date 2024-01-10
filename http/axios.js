// 引入 axios 模块
import axios from "axios";

// 创建一个 axios 实例
const instance = axios.create({
    baseURL: 'https://api.jqrjq.cn/', // 请求基地址，例如：https://api.jqrjq.cn/
    timeout: 6000 // 请求超时时间，单位为毫秒
    
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在发送请求前对请求配置进行处理
        return config;
    },
    (err) => {
        // 处理请求错误，返回一个带有错误信息的 Promise 对象
        return Promise.reject(err);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (res) => {
        // 在接收到响应后对响应数据进行处理
        return res.data;
    },
    (err) => {
        // 处理响应错误，返回一个带有错误信息的 Promise 对象
        return Promise.reject(err.response.data);
    }
);

// 导出创建的 axios 实例，以便在应用程序中使用
export default instance;

// Promise对象，异步处理对象（ES6）
// const promise = new Promise(
//     (resolve,reject)=>
//     // 如果成功    
//     resolve()
//     // 失败
//     reject()
// )

// promise.then(res=>{

// }),catch(err=>{

// })