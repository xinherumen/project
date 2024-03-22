import { createRouter, createWebHistory } from 'vue-router'
import { constantRouter } from './router'

const router = createRouter({
  //后面括号里面可能会报错注意
  history: createWebHistory(),
  routes: constantRouter,
  //滚动行为
  scrollBehavior(){
    return{
      left:0,
      top:0
    }
  }
})

export default router
