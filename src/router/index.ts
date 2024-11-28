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
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/errorMessage/404.vue")
  }
];

/**
 * @description 📚 路由参数配置简介
 * @param path ==> 路由菜单访问路径
 * @param name ==> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
 * @param redirect ==> 路由重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 路由菜单元信息
 * @param meta.icon ==> 菜单和面包屑对应的图标
 * @param meta.title ==> 路由标题 (用作 document.title || 菜单的名称)
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 路由外链时填写的访问地址
 * @param meta.isHide ==> 是否在菜单中隐藏 (通常列表详情页需要隐藏)
 * @param meta.isFull ==> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isAffix ==> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
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
    redirect: '/userList',
    children: [
      {
        path: '/welcome',
        meta: {title: '欢迎页面'},
        component: () => import('@/views/welcome/index.vue')
      },
      {
        path: '/userList',
        meta: {title: '用户列表'},
        component: () => import('@/views/userList/index.vue')
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
    /* 如果 tokens 不存在, 页面强制跳转登陆页面 */
    // 必须携带token
    if (!userInfoStore.token) {
      return next('/login')
    } else {
      next()
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
