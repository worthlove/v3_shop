// 导入 defineConfig 函数，用于定义 Vite 配置
import {defineConfig} from 'vite';
// 导入 vue 插件，用于支持 Vue 单文件组件
import vue from '@vitejs/plugin-vue';
// 导入 path 模块，用于处理路径
import {resolve} from 'path';
// 导入 vue-jsx 插件，用于支持 JSX
import vueJsx from '@vitejs/plugin-vue-jsx';

import AutoImport from 'unplugin-auto-import/vite';

import vueDevTools from 'vite-plugin-vue-devtools';

// 导入 package.json 文件，用于获取项目信息
import pkg from './package.json';
// 导入 dayjs 模块，用于处理日期时间
import dayjs from "dayjs";

// 从 package.json 文件中获取项目的名称、版本、依赖和开发依赖
const {dependencies, devDependencies, name, version} = pkg;
// 最后一次打包时间
const __APP_INFO__ = {
  pkg: {dependencies, devDependencies, name, version},
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

/**
 * Vite 配置文件
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: './auto-imports.d.ts',
      vueTemplate: true,
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['@vue/shared'],
  },
  // 配置基础路径，用于指定项目的根路径
  base: '/',
  // 配置路径别名，方便在代码中使用相对路径
  resolve: {
    alias: {
      // 将 @ 符号映射到 src 目录
      '@': resolve(__dirname, 'src'),
      // 将 assets 映射到 src/assets 目录
      '@assets': resolve(__dirname, './src/assets'),
      // 将 modules 映射到 src/modules 目录
      '@components': resolve(__dirname, './src/modules'),
      // 将 views 映射到 src/views 目录
      '@views': resolve(__dirname, './src/views'),
      // 将 api 映射到 src/api 目录
      '@api': resolve(__dirname, './src/api'),
      // 将 utils 映射到 src/utils 目录
      '@utils': resolve(__dirname, './src/utils'),
      // 将 store 映射到 src/store 目录
      '@store': resolve(__dirname, './src/store'),
      // 将 router 映射到 src/router 目录
      '@router': resolve(__dirname, './src/router'),
      // 将 types 映射到 src/types 目录
      '@types': resolve(__dirname, './src/types'),
      // 将 layout 映射到 src/layout 目录
      '@layout': resolve(__dirname, './src/layout'),
      // 将 plugins 映射到 src/plugins 目录
      '@plugins': resolve(__dirname, './src/plugins'),
      // 将 directives 映射到 src/directives 目录
      '@directives': resolve(__dirname, './src/directives'),
      // 将 filters 映射到 src/filters 目录
      '@filters': resolve(__dirname, './src/filters'),
      // 将 mixins 映射到 src/mixins 目录
      '@mixins': resolve(__dirname, './src/mixins'),
      // 将 config 映射到 src/config 目录
      '@config': resolve(__dirname, './src/config'),
      // 将 global 映射到 src/global 目录
      '@global': resolve(__dirname, './src/global'),
      // 将 lang 映射到 src/lang 目录
      '@lang': resolve(__dirname, './src/lang'),
      // 将 services 映射到 src/services 目录
    },
  },
  define: {
    // 包含 配置文件 和 最后一次打包时间
    // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
    __APP_INFO__: JSON.stringify(__APP_INFO__)
  },
  // 配置服务器选项，这里配置了端口号和代理
  server: {
    // 配置服务器端口号，默认为 3000
    // port: 8090,
    // 配置代理，用于将请求转发到其他服务器
    proxy: {
      // 配置代理，用于将请求转发到其他服务器
      '/api': {
        // 代理目标地址
        target: 'http://127.0.0.1:8091/',
        // 是否允许跨域
        changeOrigin: true,
        // 重写请求路径，将 /api 替换为空
        rewrite: (path) => path.replace(/^\/api/, ''),
        // 是否允许安全连接
        secure: false,
        // 是否允许 WebSocket 连接
        ws: true
      },
    },
  }
});
