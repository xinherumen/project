//登录接口需要携带参数ts类型
export interface loginForm{
    account:string,
    password:string,
    code:string
}

interface dateType{
    token:string
}
//登录接口返回数据类型
export interface loginResponseDate{
    code:number,
    msg:string,
    data:dateType
}