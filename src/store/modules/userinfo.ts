import {defineStore, acceptHMRUpdate} from 'pinia'
import  type {UserState} from "@/store/interface";
import piniaPersistConfig from "@/store/helper/persist.ts";

export const useUserInfoStore = defineStore({
  id: 'UserInfoStore', // ID必填且唯一
  state: (): UserState => ({
    token: "",
    userInfo: {name: "admin",password: "123456"},
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
  },
  // 开启数据持久化缓存
  persist: piniaPersistConfig('UserInfoStore'),
})
// Pinia 是 vuex 新替代方案。Pinia 中热更新实现，借助 import.meta
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserInfoStore, import.meta.hot));
}
