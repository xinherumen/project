//登录接口需要携带参数ts类型
export interface loginForm{
    account:string,
    password:string,
    code:string,
}
//登录接口返回数据中data类型
//登录接口返回数据类型
export interface loginResponseData{
    code:number,
    msg:string,
    data:string|null
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
interface JobData {
    jobId: number | null;
    company: string;
    title: string;
    salary: string;
    education: string;
    description: string;
    hiringManager: string;
    address: string;
    link: string;
    recruitersId: number;
}

export interface xiangxidata {
    code: number;
    msg: string;
    data: JobData;
}

//收藏返回数据
export interface select{
    code:number,
    msg:string,
    data:string
}
export interface select1{
    code:number,
    msg:string,
    data:{
    text:string,
    score:number
    }
}
//简历数据返回数据
export interface resumetype{
    code:number,
    msg:string,
    data:{
    name: string;
  intendedPosition: string;
  address: string;
  intendedSalary: string;
  education: string;
  projectExperience: string;
  internshipExperience: string;
  hobby: string;
  selfEvaluation: string;
  skill: string;
    }
}
interface Job {
    jobId: number;
    company: string;
    title: string;
    salary: string;
    education: string;
    description: string;
    hiringManager: string;
    address: string;
    link: string;
    recruitersId: number;
}
export interface JobListResponse {
    code: number;
    msg: string;
    data: {
        total: number;
        list: Job[];
        pageNum: number;
        pageSize: number;
        size: number;
        startRow: number;
        endRow: number;
        pages: number;
        prePage: number;
        nextPage: number;
        isFirstPage: boolean;
        isLastPage: boolean;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        navigatePages: number;
        navigatepageNums: number[];
        navigateFirstPage: number;
        navigateLastPage: number;
    };
}
export interface JobInfo {
    name: string;
    gender: string;
    phonenumber: string;
    mailbox: string;
    birthDate: string;
    address: string;
    accountName: string;
}
export interface UserData {
    code: number;
    msg: string;
    data: UserDataDetail;
}

interface UserDataDetail {
    seeker_id: number | null;
    account: string;
    password: string;
    name: string;
    gender: string;
    phonenumber: string;
    mailbox: string;
    birth_date: string;
    address: string;
    account_name: string;
    avatar: string;
}
