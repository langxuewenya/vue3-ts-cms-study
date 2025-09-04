import { Module } from "vuex";
import router from "@/router";

import { ILoginState } from "./types";
import { IRootState } from "../types";

import {
  accountLoginRequest,
  getUserById,
  getUserMenusByRoleId,
  logout
} from "@/api/login/login";
import { localCache } from "@/utils/cache";
import { mapMenusToRoutes } from "@/utils/map-menus";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: localCache.getCache("token") ?? "", // 登录token
      userInfo: localCache.getCache("userInfo") ?? {}, // 用户信息
      userMenus: localCache.getCache("userMenus") ?? [] // 用户菜单
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    saveUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;

      const routes = mapMenusToRoutes(userMenus);
      // 将动态路由添加到路由器中
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit }, payload: any) {
      // 1. 实现登录逻辑
      const loginRes: any = await accountLoginRequest(payload);
      const id = loginRes?.data?.id;
      const token = loginRes?.data?.token || "";
      commit("changeToken", token);
      localCache.setCache("token", token);

      // 2. 请求用户信息
      const userInfoRes: any = await getUserById(id);
      const userInfo = userInfoRes?.data || {};
      commit("saveUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);

      // 3. 根据角色获取用户菜单
      const roleId = userInfo?.role?.id;
      const userMenusRes: any = await getUserMenusByRoleId(roleId);
      const userMenus = userMenusRes?.data;
      commit("changeUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);

      // 4. 跳转到首页
      router.push("/main");
    },

    // 加载本地缓存
    loadLocalCache({ commit }) {
      const token = localCache.getCache("token");
      if (token) commit("changeToken", token);
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) commit("saveUserInfo", userInfo);
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) commit("changeUserMenus", userMenus);
    },

    // 退出登录
    async logoutAction({ commit }) {
      const userId = localCache.getCache("userInfo").id;
      const logoutRes: any = await logout(
        { apipost_id: "1c7cd5831118d" },
        userId
      );
      if (logoutRes.msg === "success") {
        // 清空缓存
        commit("changeToken", "");
        commit("saveUserInfo", {});
        commit("changeUserMenus", []);

        // 跳转登录页
        router.push("/login");
      }
    }
  }
};

export default loginModule;
