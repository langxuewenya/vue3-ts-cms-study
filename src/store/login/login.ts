import { Module } from "vuex";
import router from "@/router";

import { ILoginState } from "./types";
import { IRootState } from "../types";

import {
  accountLoginRequest,
  getUserById,
  getUserMenusByRoleId
} from "@/api/login/login";
import { localCache } from "@/utils/cache";

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
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit }, payload: any) {
      // 1. 实现登录逻辑
      const loginRes: any = await accountLoginRequest(
        { apipost_id: "39e7b98f318002" },
        payload
      );
      const id = loginRes?.data?.id;
      const token = loginRes?.data?.token || "";
      commit("changeToken", token);
      localCache.setCache("token", token);

      // 2. 请求用户信息
      const userInfoRes: any = await getUserById(
        { apipost_id: "3a09cdb5f1105c" },
        id
      );
      const userInfo = userInfoRes?.data || {};
      commit("saveUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);

      // 3. 根据角色获取用户菜单
      const roleId = userInfo?.role?.id;
      const userMenusRes: any = await getUserMenusByRoleId(
        { apipost_id: "3a7e0d6e7111bf" },
        roleId
      );
      const userMenus = userMenusRes?.data;
      commit("changeUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);

      // 4. 跳转到首页
      router.push("/main");
    }
  }
};

export default loginModule;
