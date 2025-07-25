import { Module } from "vuex";

import { ISystemState } from "./types";
import { IRootState } from "../../types";

import { getPageListData } from "@/api/main/system/system";

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
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageListRes: any = await getPageListData(
        { apipost_id: "33d1304311292" },
        payload.pageUrl,
        payload.queryInfo
      );
      const { list, totalCount } = pageListRes.data;
      commit("changeUserList", list);
      commit("changeUserTotalCount", totalCount);
    }
  }
};

export default systemModule;
