import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { localCache } from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main" // 重定向到主页面
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/not-found/not-found.vue")
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited. 当访问路由时，懒加载该路由
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
  // }
];

const router = createRouter({
  // 使用createWebHashHistory，解决打包后index.html文件打开后页面空白的问题
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

// 导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache("token");
  if (to.path !== "/login" && !token) {
    return "/login";
  }

  if (to.path === "/main") {
    return firstMenu.path;
  }
});

export default router;
