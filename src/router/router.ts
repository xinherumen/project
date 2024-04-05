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
    name: 'xiangxi',
    component: ()=>import ('@/views/seeker/jobinfo.vue'),
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
      title:'岗位管理',
      hidden: false,
      icon:"Promotion"
    },
    children:[
    {
      path: '/seach',
      name: 'seach',
      component: ()=>import ('@/views/seeker/search.vue'),
      meta:{
        title:'岗位搜索',
        hidden: false,
        icon:"Promotion"
      },
    },
      {
        path: '/collect',
        name: 'collect',
        component: ()=>import ('@/views/seeker/collect.vue'),
        meta:{
          title:'收藏岗位',
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
      title:'简历管理',
      hidden: false,
      icon:"Promotion"
    },
    children:[
    {
      path: '/upload',
      name: 'upload',
      component: ()=>import ('@/views/seeker/resume/upload.vue'),
      meta:{
        title:'简历上传',
        hidden: false,
        icon:"Promotion"
      },
    },
      {
        path: '/modify',
        name: 'modify',
        component: ()=>import ('@/views/seeker/resume/modify.vue'),
        meta:{
          title:'简历填写/修改',
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
  },]