import {defineStore, acceptHMRUpdate} from 'pinia'
import type {GlobalState} from '@/store/interface/index'
import {DEFAULT_PRIMARY} from "@/config";

export const useLoginStore = defineStore({
  id: 'LoginStore', // ID必填且唯一
  state: (): GlobalState => ({
    // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
    layout: "vertical",
    // element 组件大小
    assemblySize: "default",
    // 当前系统语言
    language: null,
    // 当前页面是否全屏
    maximize: false,
    // 主题颜色
    primary: DEFAULT_PRIMARY,
    // 深色模式
    isDark: false,
    // 灰色模式
    isGrey: false,
    // 色弱模式
    isWeak: false,
    // 侧边栏反转
    asideInverted: false,
    // 头部反转
    headerInverted: false,
    // 折叠菜单
    isCollapse: false,
    // 菜单手风琴
    accordion: true,
    // 页面水印
    watermark: false,
    // 面包屑导航
    breadcrumb: true,
    // 面包屑导航图标
    breadcrumbIcon: true,
    // 标签页
    tabs: true,
    // 标签页图标
    tabsIcon: true,
    // 页脚
    footer: true
  }),
  getters: {},
  actions: {
    setGlobalState(key: keyof GlobalState, value: any) {
      this.$patch({[key]: value});
    },
    persist: {
      // 修改存储中使用的键名称，默认为当前 Store的 id
      key: 'LoginStore',
      // 修改为 sessionStorage，默认为 localStorage
      storage: sessionStorage,
      // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
      paths: [],
    },
  }
})
// Pinia 是 vuex 新替代方案。Pinia 中热更新实现，借助 import.meta
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot));
}

// 使用示例
// import { useLoginStore } from '@/store/modules/login';
// const loginStore = useLoginStore();
//
// console.log(loginStore.language,'start');
//
// loginStore.setGlobalState("language", 'zh');
//
// console.log(loginStore.language,'end');
