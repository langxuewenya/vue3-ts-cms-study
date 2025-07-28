import { IForm } from "@/base-ui/select-form";

import { menuTypeEnum } from "./enum";

export const searchFormConfig: IForm = {
  labelWidth: "80px",
  itemStyle: {
    padding: "0 10px"
  },
  formItems: [
    {
      field: "name",
      type: "input",
      label: "菜单名称",
      placeholder: "请输入菜单名称"
    },
    {
      field: "type",
      type: "select",
      label: "类型",
      placeholder: "请选择菜单类型",
      options: menuTypeEnum
    },
    {
      field: "createTime",
      type: "datepicker",
      label: "创建时间",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
    }
  ]
};
