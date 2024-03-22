import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/stores/modules/user";
//创建axios实例
let request = axios.create({
    baseURL: 'http://192.168.124.36:8089',
    timeout: 5000
})
//请求拦截器
request.interceptors.request.use((config) => {
    //获取用户小仓库，获取token
    let userStore = useUserStore();
    if(userStore.token){
        config.headers.token = userStore.token;
    }
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    //处理网络错误
    let msg = '';
    let status = error.response.state;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;