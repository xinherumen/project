//对外暴露路由
export const constantRouter=[
  {
    path: '/login',
    name: 'login',
    component: ()=>import ('@/views/seeker/login.vue'),
    meta:{
      title:'登录',
      hidden: true,
    }
  },
  {
    path: '/xiangxi',
    name: 'xiangxi',    component: ()=>import ('@/views/seeker/job/jobinfo.vue'),
    meta:{
      title:'岗位详细',
      hidden: true,
      icon:"Promotion"
    },
  },
  {
    path: '/',
    name: 'layout',
    component: ()=>import ('@/layout/index.vue'),
    meta:{
      title:'layout',
      hidden: true,
      icon:""
    },
    redirect: '/home',
    children:[
      {
        path: '/home',
        name: 'home',
        component: ()=>import ('@/views/seeker/home.vue'),
        meta:{
          title:'首页',
          hidden: false,
          icon:"HomeFilled"
        }
      },
    ]
  },
  {
    path: '/job1',
    name: 'job1',
    component: ()=>import ('@/layout/index.vue'),
    meta:{
      title:'岗位管理',
      hidden: false,
      icon:"OfficeBuilding"
    },
    children:[
    {
      path: '/seach1',
      name: 'seach1',
      component: ()=>import ('@/views/seeker/job/search.vue'),
      meta:{
        title:'岗位搜索',
        hidden: false,
        icon:"Search"
      },
    },
    {
      path: '/recommend1',
      name: 'recommend1',
      component: ()=>import ('@/views/seeker/job/recommend.vue'),
      meta:{
        title:'岗位推荐',
        hidden: false,
        icon:"Promotion"
      },
  },
      {
        path: '/collect1',
        name: 'collect1',
        component: ()=>import ('@/views/seeker/job/collect.vue'),
        meta:{
          title:'已收藏岗位',
          hidden: false,
          icon:"StarFilled"
        },
    },
    {
      path: '/history1',
      name: 'history1',
      component: ()=>import ('@/views/seeker/job/collect.vue'),
      meta:{
        title:'查看岗位历史',
        hidden: false,
        icon:"VideoCameraFilled"
      },
  },
    ]
  },
  {
    path: '/resume1',
    name: 'resume1',
    component: ()=>import ('@/layout/index.vue'),
    meta:{
      title:'简历管理',
      hidden: false,
      icon:"List"
    },
    children:[
    {
      path: '/upload1',
      name: 'upload1',
      component: ()=>import ('@/views/seeker/resume/upload.vue'),
      meta:{
        title:'简历上传',
        hidden: false,
        icon:"UploadFilled"
      },
    },
      {
        path: '/modify1',
        name: 'modify1',
        component: ()=>import ('@/views/seeker/resume/modify.vue'),
        meta:{
          title:'简历填写/修改',
          hidden: false,
          icon:"Upload"
        },
    },
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: ()=>import ('@/layout/index.vue'),
    meta:{
      title:'个人中心',
      hidden: false,
      icon:"Avatar"
    },
    children:[
    {
      path: '/userinfo',
      name: 'userinfo',
      component: ()=>import ('@/views/seeker/userinfo/userinfo.vue'),
      meta:{
        title:'个人信息',
        hidden: false,
        icon:"User"
      },
    },
      {
        path: '/upinfo',
        name: 'upinfo',
        component: ()=>import ('@/views/seeker/userinfo/updatainfo.vue'),
        meta:{
          title:'个人信息补充',
          hidden: false,
          icon:"Upload"
        },
    },
    ]
  },
  
  {
    path: '/404',
    name: '404',
    component: ()=>import ('@/views/404/index.vue'),
    meta:{
      title:'404',
      hidden: true,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect:'/404',
    name: 'Any',
    meta:{
      title:'任意路由',
      hidden: true,
    }
  },]
  
export const recruitersRouter=[

  {
    path: '/xiangxi',
    name: 'xiangxi',
    component: ()=>import ('@/views/seeker/job/jobinfo.vue'),
    meta:{
      title:'岗位详细',
      hidden: true,
      icon:"Promotion"
    },
  },
  {
    path: '/',
    name: 'layout',
    component: ()=>import ('@/layout/index.vue'),
    meta:{
      title:'layout',
      hidden: true,
      icon:""
    },
    redirect: '/home',
    children:[
      {
        path: '/home',
        name: 'home',
        component: ()=>import ('@/views/seeker/home.vue'),
        meta:{
          title:'首页',
          hidden: false,
          icon:"Promotion"
        }
      },
    ]
  },
  {
    path: '/job',
    name: 'job',
    component: ()=>import ('@/layout/index.vue'),
    meta:{
      title:'简历管理',
      hidden: false,
      icon:"Promotion"
    },
    children:[
    {
      path: '/recommend',
      name: 'recommend',
      component: ()=>import ('@/views/seeker/job/recommend.vue'),
      meta:{
        title:'简历推荐',
        hidden: false,
        icon:"Promotion"
      },
  },
      {
        path: '/collect',
        name: 'collect',
        component: ()=>import ('@/views/seeker/job/collect.vue'),
        meta:{
          title:'已收藏简历',
          hidden: false,
          icon:"Promotion"
        },
    },
    ]
  },
  {
    path: '/resume',
    name: 'resume',
    component: ()=>import ('@/layout/index.vue'),
    meta:{
      title:'岗位管理',
      hidden: false,
      icon:"Promotion"
    },
    children:[
    {
      path: '/newjob',
      name: 'newjob',
      component: ()=>import ('@/views/recruiters/job/newjob.vue'),
      meta:{
        title:'新建岗位',
        hidden: false,
        icon:"Promotion"
      },
    },
      {
        path: '/joblist',
        name: 'joblist',
        component: ()=>import ('@/views/recruiters/job/joblist.vue'),
        meta:{
          title:'已上传岗位',
          hidden: false,
          icon:"Promotion"
        },
    },
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: ()=>import ('@/layout/index.vue'),
    meta:{
      title:'个人中心',
      hidden: false,
      icon:"Promotion"
    },
    children:[
    {
      path: '/userinfo',
      name: 'userinfo',
      component: ()=>import ('@/views/recruiters/userinfo/userinfo.vue'),
      meta:{
        title:'个人信息',
        hidden: false,
        icon:"Promotion"
      },
    },
      {
        path: '/upinfo',
        name: 'upinfo',
        component: ()=>import ('@/views/recruiters/userinfo/updatainfo.vue'),
        meta:{
          title:'个人信息补充',
          hidden: false,
          icon:"Promotion"
        },
    },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: ()=>import ('@/views/404/index.vue'),
    meta:{
      title:'404',
      hidden: true,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect:'/404',
    name: 'Any',
    meta:{
      title:'任意路由',
      hidden: true,
    }
  },
]