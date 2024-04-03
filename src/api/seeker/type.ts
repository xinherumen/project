//登录接口需要携带参数ts类型
export interface loginForm{
    account:string,
    password:string,
    code:string,
}
//登录接口返回数据中data类型
interface dateType{
    token:string|null;
}
//登录接口返回数据类型
export interface loginResponseData{
    code:number,
    msg:string,
    data:dateType
}
//
export interface userInfoReponseData {
    code:number,
    msg: string,
    data:{
    seeker_id: null,
    account:string,
    password:string,
    name: string,
    gender: string,
    phonenumber:string,
    mailbox: string,
    birth_date:string,
    address: string,
    account_name: string,
    avatar: string
    }
}
export interface companydata {
    code:number,
    msg: string,
    data:
    {
        jobid:number
        title: string
        education:string
        company:string
        hiringManager:string
        salary:string
        address:string
    }
}
export interface xiangxidata {
    code:number,
    msg: string,
    data:
    {
        jobid:number
        title: string
        education:string
        company:string
        hiringManager:string
        salary:string
        address:string
        description:string
    }
}