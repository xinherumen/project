//createUserList:次函数执行会返回一个数组,数组里面包含两个用户信息
function createUserList() {
    return [
        {
            userId: 1,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'student',
            password: '123456',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token',
        },
        {
            userId: 2,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'zhaopinzhe',
            password: '123456',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token',
        },
    ]
}
function creatgosiList() {
    return[
        {
          jobid:1222,
          title: '产品经理',
          education:'本科',
          company:'腾讯',
          hiringManager:'张经理',
          salary:'10000',
          address:'杭州'
        },
        {
          jobid:1232,
          title: '产品经理',
          education:'本科',
          company:'腾讯',
          hiringManager:'张经理',
        salary:'10000',
        address:'杭州'
        },
      ]
}
function creatxiangxi() {
    return[
        {
          jobid:1222,
          title: '产品经理',
          education:'本科',
          company:'腾讯',
          hiringManager:'张经理',
          salary:'10000',
          address:'杭州',
          description:'We are looking for a skilled Software Engineer to join our team...'
        },
        {
          jobid:1232,
          title: '产品经理',
          education:'本科',
          company:'腾讯',
          hiringManager:'张经理',
        salary:'10000',
        address:'杭州',
        description:'We are looking for a skilled Software Engineer to join our team...' 

        },
      ]
}
//对外暴露一个数组:数组里面包含两个接口
//登录假的接口
//获取用户信息的假的接口
export default [
    // 用户登录接口
    {
        url: '/api/seeker/login',//请求地址
        method: 'post',//请求方式
        response: ({ body }) => {
            //获取请求体携带过来的用户名与密码
            const { account, password,code } = body;
            //调用获取用户信息函数,用于判断是否有此用户
            const checkUser = createUserList().find(
                (item) => item.username === account && item.password === password,
            )
            //没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: '账号或者密码不正确' } }
            }
            //如果有返回成功信息
            const { token } = checkUser
            return { code: 200, data: { token } }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
            //获取请求头携带token
            const token = request.headers.token;
            //查看用户信息是否包含有次token用户
            const checkUser = createUserList().find((item) => item.token === token)
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } }
            }
            //如果有返回成功信息
            return { code: 200, data: { checkUser } }
        },
    },
    // 获取首页展示信息
    {
        url:'/api/seeker/getTopJob',
        method:'get',
        response: (request) => {
            const { page } = request.query;
            // const { page } = request.params;
           const returndata = creatgosiList();
            return { code: 200,msg:"成功", data:returndata  }
        },
    },
    //搜索岗位信息
    {
        url:'/api/seeker/selectPosition',
        method:'get',
        response: (request) => {
            const { page,salary,adress,education } = request.query;
           const returndata = creatgosiList()[0];
            return { code: 200,msg:"成功", data:returndata  }
        },
    },
    //详细数据
    {
        url:'/api/seeker/xiangxi',
        method:'get',
        response: (request) => {
            const { jobid } = request.query;
            const data=creatxiangxi();
           const returndata = data[0];
            return { code: 200,msg:"成功", data:returndata  }
        },
    },
    //收藏
    {
        url:'/api/seeker/collection',
        method:'post',
        response: ({body}) => {
            const { jobid } = body;
            const data = '你好啊'
            return { code: 200,msg:"成功", data:data  }
        },
    }
]
