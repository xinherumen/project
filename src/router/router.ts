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
    path: '/',
    name: 'layout',
    component: ()=>import ('@/layout/index.vue'),
    meta:{
      title:'',
      hidden: false,
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
    path: '/seekerhome',
    name: 'seekerhome',
    component: ()=>import ('@/views/seeker/home.vue'),
    meta:{
      title:'项目管理',
      hidden: false,
      icon:"Promotion"
    },
    children:[
    {
      path: '/sed',
      name: 'seek',
      component: ()=>import ('@/views/HomeView.vue'),
      meta:{
        title:'人员管理',
        hidden: false,
        icon:"Promotion"
      },
    },
      {
        path: '/dsd',
        name: 'seek2',
        component: ()=>import ('@/views/seeker/test.vue'),
        meta:{
          title:'人员',
          hidden: false,
          icon:"Promotion"
        },
    }
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