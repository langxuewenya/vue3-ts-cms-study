import { Module } from "vuex";

import { ISystemState } from "./types";
import { IRootState } from "../../types";

import {
  getPageListData,
  addPageObj,
  editPageRow,
  deletePageRow
} from "@/api/main/system/system";
import { capitalizeString, menuListToTree } from "@/utils/tool";
import { formatDateTime } from "@/utils/format";

const pageUrlMap: Record<string, any> = {
  user: "/user/list", // 用户页面列表
  userUpdate: "/user", // 用户页面增删改
  menu: "/menu/list", // 菜单页面列表
  menuUpdate: "/menu", // 菜单页面增删改
  role: "/role/list", // 角色页面列表
  roleUpdate: "/role" // 角色列表增删改
};

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userTotalCount: 0,
      menuList: [],
      menuTotalCount: 0,
      roleList: [],
      roleTotalCount: 0
    };
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      // 格式化
      const formatList = userList.map((item) => {
        return {
          ...item,
          create_time: formatDateTime(item.create_time),
          update_time: formatDateTime(item.update_time)
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
          create_time: formatDateTime(item.create_time)
        };
      });
      state.menuList = menuListToTree(formatList);
    },
    changeMenuTotalCount(state, menuTotalCount: number) {
      state.menuTotalCount = menuTotalCount;
    },
    changeRoleList(state, roleList: any[]) {
      const formatList = roleList.map((item) => {
        return {
          ...item,
          create_time: formatDateTime(item.create_time),
          update_time: formatDateTime(item.update_time)
        };
      });
      state.roleList = formatList;
    },
    changeRoleTotalCount(state, roleTotalCount: number) {
      state.roleTotalCount = roleTotalCount;
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
    // 获取页面列表数据
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
    },
    // 页面新增对象（如用户页面新增用户，菜单页面新增菜单）
    async addPageObjAction({ commit }, payload: any) {
      const pageName = `${payload.pageName}Update`;
      const pageUrl = pageUrlMap[pageName];

      const addRes: any = await addPageObj(pageUrl, payload.queryInfo);
      return addRes;
    },
    // 页面行数据编辑
    async editPageRowAction({ commit }, payload: any) {
      const pageName = `${payload.pageName}Update`;
      const pageUrl = pageUrlMap[pageName];

      const editRes: any = await editPageRow(pageUrl, payload.queryInfo);
      return editRes;
    },
    // 页面行数据删除
    async deletePageRowAction({ commit }, payload: any) {
      const pageName = `${payload.pageName}Update`;
      const pageUrl = pageUrlMap[pageName] + `/${payload.queryInfo.id}`;

      const deleteRes: any = await deletePageRow(pageUrl);
      return deleteRes;
    }
  }
};

export default systemModule;
