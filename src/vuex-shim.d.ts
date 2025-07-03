import { Store } from "vuex";

// 扩展 Vue 的类型声明
declare module "vue" {
  interface ComponentCustomProperties {
    $store: Store<any>; // 如果使用模块，替换 `any` 为你的根状态类型
  }
}
