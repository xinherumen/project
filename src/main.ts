
import { createApp } from 'vue'
import pinia from './stores'
import App from '@/App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//SVG需要的配置代码
import 'virtual:svg-icons-register'
//配置elment-plus国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Particles from 'particles.vue3'
const app= createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
  })
//将<svg-icon></svg-icon>注册为全局组件
// import SvgIcon from '@/components/SvgIcon/index.vue'
// app.component('SvgIcon',SvgIcon)
//引入自定义插件对象：注册整个项目的全局组件
import globalComponent from '@/components'
//安装自定义组件
app.use(globalComponent)
app.use(Particles)

//引入模板的全局样式
import'@/styles/index.scss'
app.mount('#app')
