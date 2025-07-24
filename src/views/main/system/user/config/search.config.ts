import { IForm } from "@/base-ui/select-form";

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
      field: "phone",
      type: "input",
      label: "手机号",
      placeholder: "请输入手机号"
    },
    {
      field: "sex",
      defaultValue: "woman",
      type: "select",
      label: "性别",
      placeholder: "请选择性别",
      options: [
        { label: "男", value: "man" },
        { label: "女", value: "woman" }
      ]
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
