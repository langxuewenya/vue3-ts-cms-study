import { IForm } from "@/base-ui/select-form";

import { roleEnum } from "./enum";

export const searchFormConfig: IForm = {
  labelWidth: "80px",
  itemStyle: {
    padding: "0 10px"
  },
  formItems: [
    {
      field: "username",
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名"
    },
    {
      field: "cellphone",
      type: "input",
      label: "手机号",
      placeholder: "请输入手机号"
    },
    // {
    //   field: "sex",
    //   defaultValue: "woman",
    //   type: "select",
    //   label: "性别",
    //   placeholder: "请选择性别",
    //   options: sexEnum
    // },
    {
      field: "role_id",
      defaultValue: "",
      type: "select",
      label: "角色",
      placeholder: "请选择角色",
      options: roleEnum
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
