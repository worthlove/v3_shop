import axios from "axios";
import NProgress from '@/config/nprogress';
import 'nprogress/nprogress.css'
import {ErrorCodeType} from "@/utils/error-code-type";
import {ElMessage} from 'element-plus'
import {useUserInfoStore} from "@/store/modules/userinfo.ts";

const userInfoStore = useUserInfoStore();
const service = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  timeout: 300 * 1000, // 请求超时时间设置为300秒
  // withCredentials: true, // 允许携带cookie
})
// 请求拦截器
service.interceptors.request.use((config) => {
// 打印请求拦截器的日志
  console.log('请求拦截器 =>', config)
  /* 将存储在sessionStorage中的token令牌存入config.headers.Authorization中 */
// 从 sessionStorage 中获取 token，并设置到请求头的 Authorization 字段
  config.headers.Authorization = userInfoStore.token;
//   config.headers.Authorization = ().token;
// 开启进度条
  NProgress.start();
// 返回配置对象
  return config;
// 处理请求错误
}, (error) => {
// 关闭进度条
  NProgress.done()
// 返回 Promise 错误对象
  return Promise.reject(error);
});

/**
 * 响应拦截器
 */
// 响应拦截器函数
service.interceptors.response.use(function (res) {
// 打印响应拦截器的日志
  console.log('响应拦截器 =>', res.status)
// 关闭进度条
  NProgress.done()
// 获取响应状态码
  const code: number = res.status;
// 获取错误信息
  const msg = ErrorCodeType(code) || res.data['msg'] || ErrorCodeType(Number('default'));

// 根据响应状态码处理响应
  if (res.status == 200) {
// 如果响应成功，返回响应数据
    return Promise.resolve(res.data)
  } else {
// 如果响应失败，弹出错误信息
    ElMessage.error(msg)
// 返回 Promise 错误对象
    return Promise.reject(res.data)
  }
})

export default service
