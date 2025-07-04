import { App } from "vue"; // 引入 Vue 的 App 类型
import registerElementPlus from "./register-element-plus"; // 引入 Element Plus 注册函数

export function globalRegister(app: App): void {
  registerElementPlus(app); // 注册 Element Plus 组件
}
