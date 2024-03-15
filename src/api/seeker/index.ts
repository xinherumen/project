//统一管理项目找工作者相关的接口
import request from '@/utils/request'
import type { loginForm, loginResponseDate } from './type'
enum API{
    LOGIN_URL="/seeker/login",
    REGIST_URL="/seeker/regist"
}
//暴露请求函数
export const reqLogin = (data:loginForm)=>request.post<any,loginResponseDate>(API.LOGIN_URL,data);
export const reqRegist = (data:any)=>request.post(API.REGIST_URL,data);