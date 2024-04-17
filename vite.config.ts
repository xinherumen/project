import { fileURLToPath, URL } from 'node:url'
import { UserConfigExport, ConfigEnv } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path'
import { viteMockServe } from 'vite-plugin-mock'
//引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'


// https://vitejs.dev/config/
export default defineConfig(({command})=>{
  return{
    plugins: [
      vue(),
      vueJsx(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      // viteMockServe({
      //   mockPath: './mock', // mock文件所在文件夹
      //   localEnabled: true, // 是否应用于本地
      //   prodEnabled: false, // 是否应用于生产
      //   supportTs: true, // 打开后 可以读取 ts 文件模块 请注意 打开后将无法监视.js 文件
      //   watchFiles: true, // 监视文件更改 这样更改mock的时候，不需要重新启动编译
      // }),
    ],
    // server: {
    //   port: 5173,
    //   open: true,
    //   // 配置代理
    //   proxy: {
    //     // 请求的路径前缀只要是 /testaxios 就会被拦截走这个代理
    //     '/api': {
    //     /**
    //       *  请求的目标资源再经过替换成 /httphwm/getList 后，
    //       *  会加上 http://127.0.0.1:9693 这个前缀，
    //       *  最后请求的URL为: http://127.0.0.1:9693/httphwm/getList
    //       */
    //       target: 'http://192.168.122.36:8089',
    //       ws: true,
    //       changeOrigin: true,
    //       // 拦截到的请求路径 testaxios/httphwm/getList，/testaxios会被替换成空
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //     },
    //   },
    // },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
})
// function viteMockServe(arg0: {
//   mockPath: string // 指向mock下的文件
//   localEnabled: boolean // 是否开启开发环境
// }): import("vite").PluginOption {
//   throw new Error('Function not implemented.')
// }

