import { createRouter, createWebHistory } from 'vue-router'
import { constantRouter,recruitersRouter} from './router'
let newrouter = new Set([...constantRouter, ...recruitersRouter]);
const router = createRouter({
  //后面括号里面可能会报错注意
  history: createWebHistory(),
  //@ts-ignore
  routes: newrouter,
  //滚动行为
  scrollBehavior(){
    return{
      left:0,
      top:0
    }
  }
})

export default router
