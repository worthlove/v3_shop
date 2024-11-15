import {defineStore, acceptHMRUpdate} from 'pinia'
import type {GlobalState} from '@/store/interface'
import piniaPersistConfig from "@/store/helper/persist.ts";

export const useLoginStore = defineStore({
  id: 'LoginStore', // ID必填且唯一
  state: (): GlobalState => ({
    isCollapse: false, // 是否折叠菜单
    isDark: false, // 是否开启暗黑模式
    token: '', // 登录token
    userInfo: {name: '', password: ''}, // 用户信息
  }),
  getters: {},
  actions: {
    // 设置全局状态
    setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
      this.$patch({[args[0]]: args[1]});
    },
  },
  // 开启数据持久化缓存
  persist: piniaPersistConfig('LoginStore'),
})
// Pinia 是 vuex 新替代方案。Pinia 中热更新实现，借助 import.meta
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot));
}
