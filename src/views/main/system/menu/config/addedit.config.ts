import { menuType, menuTypeEnum } from "./enum";
import { dialogTypeMap } from "@/config/enum";
import { getParentMenuListData } from "@/api/main/system/system";

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
      disabled: false, // 设置禁用状态
      type: "select",
      label: "菜单类型",
      placeholder: "请选择菜单类型",
      options: menuTypeEnum,
      // 监听，根据选择的值设置联动
      watch: (newVal: any, formItems?: any) => {
        // 与父级菜单选项联动
        const parent_id_index = formItems.findIndex(
          (item: any) => item.field == "parent_id"
        );
        if (newVal == menuType.second) {
          // 二级菜单需选择父级菜单
          formItems[parent_id_index].hide = false;
        } else if (newVal == menuType.first) {
          formItems[parent_id_index].hide = true;
        }
      }
    },
    {
      field: "parent_id",
      hide: true,
      type: "select",
      label: "父级菜单",
      placeholder: "请选择父级菜单",
      options: []
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
  },
  /**
   * 在这里编写其他处理函数
   * @param type 页面类型：新增/编辑
   * @param formData 表单数据
   * @param formItems 表单选项配置
   * @remarks 参数统一为这三个，若有变更，add-edit-dialog.vue中的函数调用处也需变更
   */
  otherFn: ({
    type,
    formData,
    formItems
  }: {
    type?: any;
    formData?: any;
    formItems?: any;
  }) => {
    // 找出formItems对应下标，方便后续函数使用
    const parent_id_index = formItems.findIndex(
      (item: any) => item.field == "parent_id"
    );
    const type_index = formItems.findIndex((item: any) => item.field == "type");

    // 获取父级菜单列表
    const getParentMenuList = async () => {
      const res: any = await getParentMenuListData("/menu/parent");
      const parentMenuList = res?.data.map((item: any) => {
        return {
          value: item.id,
          label: item.name
        };
      });
      formItems[parent_id_index].options = parentMenuList || [];
    };
    // 编辑时，根据菜单类型设置父级菜单显隐
    const setParentMenuHidden = () => {
      if (formData["type"] == menuType.second) {
        formItems[parent_id_index].hide = false;
      } else {
        formItems[parent_id_index].hide = true;
      }
    };
    // 编辑时，设置菜单类型禁选
    const disabledType = () => {
      if (type == dialogTypeMap.add) {
        formItems[type_index].disabled = false;
      } else if (type == dialogTypeMap.edit) {
        if (formData["type"] == menuType.first) {
          formItems[type_index].disabled = true;
        } else if (formData["type"] == menuType.second) {
          formItems[type_index].disabled = false;
        }
      }
    };
    return [getParentMenuList(), setParentMenuHidden(), disabledType()]; // 函数统一执行
  }
};
