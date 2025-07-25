import { createStore } from "vuex";

import loginModule from "./login/login";
import systemModule from "./main/system/system";

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
    loginModule,
    systemModule
  }
});

export function setupStore() {
  store.dispatch("loginModule/loadLocalCache");
}

export default store;
