import {createApp} from 'vue'
import App from './App.vue'

const app = createApp(App)
// 引入 pinia 插件
import pinia from "@/store/index.ts";
import router from '@/router/index.ts'
// 引入 ElementPlus 插件(npm i element-plus)
import ElementPlusPlugin from '@/plugins/element-plus'
// element icons
import * as Icons from "@element-plus/icons-vue";

Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
app.use(router).use(ElementPlusPlugin).use(pinia).mount('#app')
