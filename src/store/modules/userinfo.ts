import {defineStore, acceptHMRUpdate} from 'pinia'
import type {UserState} from "@/store/interface";

export const useUserInfoStore = defineStore({
  id: 'UserInfoStore', // ID必填且唯一
  state: (): UserState => ({
    token: "",
    userInfo: {name: "admin"}
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    },
    persist: {
      // 修改存储中使用的键名称，默认为当前 Store的 id
      key: 'UserInfoStore',
      // 修改为 sessionStorage，默认为 localStorage
      storage: sessionStorage,
      // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
      paths: [],
    },
  }
})
// Pinia 是 vuex 新替代方案。Pinia 中热更新实现，借助 import.meta
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserInfoStore, import.meta.hot));
}
