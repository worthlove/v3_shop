// 导入 Pinia 持久化状态插件的选项类型
import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @param {boolean} useSessionStorage 是否使用 sessionStorage
 * @return persist
 * */
const piniaPersistConfig = (key: string, paths?: string[], useSessionStorage = false) => {
  // 创建一个 PersistedStateOptions 对象
  const persist: PersistedStateOptions = {
    // 设置存储的键名
    key,
    // 根据 useSessionStorage 参数决定使用哪种存储方式
    storage: useSessionStorage? sessionStorage : localStorage,
    // 设置需要持久化的状态路径
    paths
  };
  // 返回配置对象
  return persist;
};

// 导出默认的配置函数
export default piniaPersistConfig;
