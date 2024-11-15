// useLoginStore
export interface GlobalState {
  isCollapse: boolean; // 是否折叠菜单
  isDark: boolean; // 是否开启暗黑模式
  token: string; // 登录token
  userInfo:{name:string,password:string} // 用户信息
}

// useUserStore
export interface UserState {
  token: string;
  userInfo: {name: string, password: string};
}
