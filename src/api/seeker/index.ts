//统一管理项目找工作者相关的接口
import request from '@/utils/request'
import type { loginForm, loginResponseData,userInfoReponseData } from './type'
enum API{
    LOGIN_URL="/seeker/login",
    REGIST_URL="/seeker/regist",
    USERINFO_URL = '/seeker/getInfo',
}
//暴露请求函数
//登录接口
export const reqLogin = (data:loginForm)=>
    request.post<any,loginResponseData>(API.LOGIN_URL,data);
//注册接口
export const reqRegist = (data:any)=>
    request.post(API.REGIST_URL,data);
//获取用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoReponseData>(API.USERINFO_URL)