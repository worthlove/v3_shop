import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 汉化 element-plus 组件


export default (app: any) => {
  
  app.use(ElementPlus, {
    locale: zhCn,
  })
}
