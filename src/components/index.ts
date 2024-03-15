import SvgIcon from './SvgIcon/index.vue'
const allGloablComponent:any={SvgIcon};
//对外暴露插件
export default{
    install(app:any){
        Object.keys(allGloablComponent).forEach(key=>{
            app.component(key,allGloablComponent[key])
        })
    }
}