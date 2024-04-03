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
      viteMockServe({
        mockPath: './mock', // mock文件所在文件夹
        localEnabled: true, // 是否应用于本地
        prodEnabled: false, // 是否应用于生产
        supportTs: true, // 打开后 可以读取 ts 文件模块 请注意 打开后将无法监视.js 文件
        watchFiles: true, // 监视文件更改 这样更改mock的时候，不需要重新启动编译
      }),
    ],
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

