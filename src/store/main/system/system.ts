import { Module } from "vuex";

import { ISystemState } from "./types";
import { IRootState } from "../../types";

import { getPageListData } from "@/api/main/system/system";
import { capitalizeString, menuListToTree } from "@/utils/tool";
import { formatDateTime } from "@/utils/format";

const pageUrlMap: Record<string, any> = {
  user: "/user/list", // 用户页面
  menu: "/menu/list" // 菜单页面
};

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userTotalCount: 0,
      menuList: [],
      menuTotalCount: 0
    };
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      // 格式化
      const formatList = userList.map((item) => {
        return {
          ...item,
          createTime: formatDateTime(item.create_time),
          updateTime: formatDateTime(item.update_time),
          roleId: item.role_id
        };
      });
      state.userList = formatList;
    },
    changeUserTotalCount(state, userTotalCount: number) {
      state.userTotalCount = userTotalCount;
    },
    changeMenuList(state, menuList: any[]) {
      const formatList = menuList.map((item) => {
        return {
          ...item,
          createTime: formatDateTime(item.create_time)
        };
      });
      state.menuList = menuListToTree(formatList);
    },
    changeMenuTotalCount(state, menuTotalCount: number) {
      state.menuTotalCount = menuTotalCount;
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
