import SvgIcon from './SvgIcon/index.vue'
const allGloablComponent:any={SvgIcon};
//引入所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//对外暴露插件
export default{
    install(app:any){
        Object.keys(allGloablComponent).forEach(key=>{
            app.component(key,allGloablComponent[key])
        });
        //将图标注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
    }
}