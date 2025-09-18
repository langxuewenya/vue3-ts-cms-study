import { dialogTypeMap } from "@/config/enum";

export const addEditConfig = {
  dialogWidth: "600px",
  formLabelWidth: "80px",
  formItems: [
    {
      field: "name",
      type: "input",
      disabled: true,
      label: "角色名称",
      placeholder: "请输入角色名称"
    },
    {
      field: "remark",
      type: "input",
      label: "角色备注",
      placeholder: "请输入角色备注"
    },
    {
      field: "id",
      hide: true
    }
  ],
  formRules: {
    name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
  },
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
    const name_index = formItems.findIndex((item: any) => item.field == "name");

    // 不可编辑角色名称
    const disabledName = () => {
      if (type == dialogTypeMap.add) {
        formItems[name_index].disabled = false;
      } else if (type == dialogTypeMap.edit) {
        formItems[name_index].disabled = true;
      }
    };

    return [disabledName()]; // 函数统一执行
  }
};
