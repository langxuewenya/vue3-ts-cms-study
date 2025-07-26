import { Module } from "vuex";

import { ISystemState } from "./types";
import { IRootState } from "../../types";

import { getPageListData } from "@/api/main/system/system";
import { capitalizeString } from "@/utils/tool";

const pageUrlMap: Record<string, any> = {
  user: "/user/list" // 用户页面
};

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userTotalCount: 0
    };
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList;
    },
    changeUserTotalCount(state, userTotalCount: number) {
      state.userTotalCount = userTotalCount;
    }
  },
  // getter可以返回一个函数
  getters: {
    pageDatas(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageDatasCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}TotalCount`];
      };
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName;
      const pageUrl = pageUrlMap[pageName];

      const pageListRes: any = await getPageListData(
        { apipost_id: "33d1304311292" },
        pageUrl,
        payload.queryInfo
      );

      const { list, totalCount } = pageListRes.data;
      commit(`change${capitalizeString(pageName)}List`, list);
      commit(`change${capitalizeString(pageName)}TotalCount`, totalCount);
    }
  }
};

export default systemModule;
