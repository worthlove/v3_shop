import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import NProgress from "@/config/nprogress";
import {useUserInfoStore} from "@/store/modules/userinfo.ts";

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/errorMessage/403.vue"),
    meta: {title: "403页面"}
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/errorMessage/404.vue"),
    meta: {title: "404页面"}
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/errorMessage/500.vue"),
    meta: {title: "500页面"}
  },
  // Resolve refresh page, route warnings
  // {
  //   path: "/:pathMatch(.*)*",
  //   component: () => import("@/components/errorMessage/404.vue")
  // }
];


/**
 * 定义路由配置
 * @param path: 路由路径
 * @param name: 路由名称
 * @param component: 路由组件
 * @param redirect: 路由重定向
 * @param meta: 路由元信息
 * @param children: 子路由
 * */
const routes: ReadonlyArray<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    redirect: '/login',
    meta: {title: 'Blog'},
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/login/index.vue"),
    meta: {title: 'G-Blog博客登陆'},
    children: [] // 添加 children 属性，即使它现在是空的
  },
  {
    path: '/home',
    name: 'Home',
    // component: () => import("@/test/ScrollTest.vue"),
    component: () => import("@/views/Home.vue"),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        meta: {title: '欢迎页面'},
        component: () => import('@/views/welcome/index.vue')
      },
      {
        path: '/users',
        meta: {title: '用户列表'},
        component: () => import('@/views/userList/index.vue')
      },
      {
        path: '/roles',
        meta: {title: '角色列表'},
        component: () => import('@/views/authority/index.vue')
      },
      // ...errorRouter
    ] // 添加 children 属性，即使它现在是空的
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import("@/views/About.vue"),
  //   children: [] // 添加 children 属性，即使它现在是空的
  // }
];

// 使用 createRouter 函数创建一个路由实例
const router = createRouter({
  // 使用 createWebHistory 函数创建一个基于 HTML5 History API 的路由历史记录
  history: createWebHistory(),
  // 定义路由配置，包括主路由和错误路由
  routes: [...routes, ...errorRouter],
  // 严格模式，设置为 false
  strict: false,
  // 定义滚动行为，每次导航时滚动到页面顶部
  scrollBehavior: () => ({left: 0, top: 0})
});


/**
 * @param 路由导航守卫
 * @param router:路由对象
 * @param to:将要访问的路径
 * @param from:代表从那个路径而来
 * @param next:是一个函数(1、next();2、next("/login"强制跳转登录页))
 * */
router.beforeEach((to, from, next) => {
  console.log('Navigating from:', from.path);
  console.log('Navigating to:', to.path);
  const userInfoStore = useUserInfoStore();// 登录页面 放行
  if (to.path === '/login') {
    return next()
  } else {
    if (!userInfoStore.token) {
      return next('/login')
    } else {

// 使用 Array.map() 方法提取 routes 数组中每个 RouteRecordRaw 对象的 children 数组中的 path 属性
      const childrenPathArray: string[] = routes.map(route => route.path)

// 使用 Array.map() 方法提取 /home 路由的 children 数组中的 path 属性
      const homeChildrenPaths: string[] = routes.find(route => route.path === '/home')?.children.map(child => child.path) || [];

// 打印 homeChildrenPaths 数组，查看提取的 path 值
      console.log(homeChildrenPaths, 'homeChildrenPaths');

// 打印 childrenPathArray 数组，查看提取的 path 值
      console.log(childrenPathArray, 'childrenPathArray');
      
      const mergedArray: string[] = childrenPathArray.concat(homeChildrenPaths);

// 打印合并后的数组，查看结果
      console.log(mergedArray, 'mergedArray');
      
      /**
       * 从数组中移除重复项
       * @param arr - 要处理的数组
       * @returns 一个新数组，其中包含原数组中的所有唯一元素
       */
      function removeDuplicates(arr: any[]): any[] {
        // 使用 filter 方法遍历数组中的每个元素
        return arr.filter((value, index, self) => {
          // 检查当前元素在数组中第一次出现的位置是否与当前索引相同
          return self.indexOf(value) === index;
        });
      }
      
      const mergedArray2: string[] = removeDuplicates(mergedArray);
      
      console.log(mergedArray2, 'mergedArray2');
      
      if (to.path === '/') {
        return next('/login')
      } else if (mergedArray2.includes(to.path)) {
        return next();
      } else {
        return next('/login');
      }
    }
  }
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});


export default router;
