import { App } from "vue"; // 引入 Vue 的 App 类型
import "element-plus/dist/index.css"; // 引入element-plus基础样式
import {
  ElButton,
  ElInput,
  ElSelect,
  ElOption,
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElTooltip,
  ElIcon,
  ElLoading,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElTabs,
  ElTabPane,
  ElPagination,
  ElCheckbox,
  ElCheckboxGroup,
  ElRadio,
  ElRadioGroup,
  ElSwitch,
  ElDatePicker,
  ElTimePicker,
  ElUpload,
  ElCard
} from "element-plus";

const components = [
  ElButton,
  ElInput,
  ElSelect,
  ElOption,
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElTooltip,
  ElIcon,
  ElLoading,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElTabs,
  ElTabPane,
  ElPagination,
  ElCheckbox,
  ElCheckboxGroup,
  ElRadio,
  ElRadioGroup,
  ElSwitch,
  ElDatePicker,
  ElTimePicker,
  ElUpload,
  ElCard
];

// 声明component类型，否则下面的 component.name 会报错
interface NamedComponent {
  name: string;
}

export default function (app: App): void {
  (components as NamedComponent[]).forEach((component) => {
    app.component(component.name, component);
  });
}
