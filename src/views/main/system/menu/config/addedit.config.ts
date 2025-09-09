import { menuTypeEnum } from "./enum";

export const addEditConfig = {
  dialogWidth: "600px", // 弹窗宽度（不设则默认500px）
  formLabelWidth: "80px", // 表单label宽度（不设默认为100px）
  formItems: [
    {
      field: "name",
      type: "input",
      label: "菜单名称",
      placeholder: "请输入菜单名称"
    },
    {
      field: "path",
      type: "input",
      label: "菜单路径",
      placeholder: "请输入菜单路径(参考用户管理：/main/system/user)"
    },
    {
      field: "type",
      defaultValue: "", // 默认选项值
      type: "select",
      label: "菜单类型",
      placeholder: "请选择菜单类型",
      options: menuTypeEnum,
      // 监听，根据选择的值设置联动
      watch: (newVal: any, formItems?: any) => {
        // 与父级菜单选项联动
        const index = formItems.findIndex(
          (item: any) => item.field == "parent_id"
        );
        if (newVal == 2) {
          formItems[index].hide = false;
        } else {
          formItems[index].hide = true;
        }
      }
    },
    {
      field: "parent_id",
      hide: true,
      type: "select",
      label: "父级菜单",
      placeholder: "请选择父级菜单"
    },
    {
      field: "icon",
      type: "input",
      label: "菜单图标",
      placeholder: "请输入图标名称（参考Element Plus：Notification）"
    },
    {
      field: "id",
      hide: true
    }
  ],
  // 表单验证规则
  formRules: {
    name: [
      { required: true, message: "请输入菜单名称", trigger: "blur" },
      { min: 2, max: 8, message: "菜单名称要求2-8位", trigger: "blur" }
    ],
    path: [{ required: true, message: "请输入菜单路径", trigger: "blur" }],
    type: [{ required: true, message: "请选择菜单类型", trigger: "blur" }]
  }
};
