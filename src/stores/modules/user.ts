//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin,reqUserInfo,reqLogout,recLogin, recLogout} from '@/api/seeker'
import type {
  loginForm,
  loginResponseData,
  userInfoReponseData,
} from '@/api/seeker/type'
import type { UserState } from './types/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN,REMOVE_TOKEN } from '@/utils/token'
//引入路由(常量路由)
import { constantRouter,recruitersRouter } from '@/router/router'
import { GET_ROUTERS } from '@/utils/selectroutes'


//创建用户小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据地方
 state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      //@ts-ignore
      menuRoutes:  GET_ROUTERS(), //仓库存储生成菜单需要数组(路由)
      username: '孤独摇滚',
      avatar: '/public/logo.png',
      //存储当前用户是否包含某一个按钮
      // buttons: [],
    }
  },
  //异步|逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      //登录请求
      const usertype = localStorage.getItem('usertype');
      console.log(usertype);
      if(usertype == 'seeker'){
      const result: loginResponseData = await reqLogin(data);
       //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 100) {
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data
        this.menuRoutes = constantRouter;
        // this.$patch({ token: result.data.token }) // 使用 $patch 更新 state
        //本地存储持久化存储一份
        //@ts-ignore
        SET_TOKEN(result.data);
        //能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        console.log(result.msg);
        return Promise.reject(new Error(result.msg))
      }
    }else{
      const result: loginResponseData = await recLogin(data);
       //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 100) {
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data
        this.menuRoutes = recruitersRouter;
        // this.$patch({ token: result.data.token }) // 使用 $patch 更新 state
        //本地存储持久化存储一份
          //@ts-ignore
        SET_TOKEN(result.data)
        //能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        console.log(result.msg);
        return Promise.reject(new Error(result.msg))
      }
    }
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像、名字]
      const result: userInfoReponseData = await reqUserInfo()
      //如果获取用户信息成功，存储一下用户信息
      if (result.code == 100) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    // 退出登录
    async userLogout() {
      //退出登录请求
      const usertype = localStorage.getItem('usertype');
      if(usertype == 'seeker'){
      const result: any = await reqLogout()
      if (result.code == 100) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        this.token = ''
        this.username = ''
        this.avatar = '/public/logo.png'
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    }else{
      const result: any = await recLogout()
      if (result.code == 100) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        this.token = ''
        this.username = ''
        this.avatar = '/public/logo.png'
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    }
  },
  getters: {},
}})
//对外暴露获取小仓库方法
export default useUserStore
