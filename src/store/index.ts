import { createStore } from "vuex";

import loginModule from "./login/login";
import { IRootState } from "./types";

const store = createStore<IRootState>({
  state() {
    return {
      name: ""
    };
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    // 引入login模块
    loginModule
  }
});

export default store;
