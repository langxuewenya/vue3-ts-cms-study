import { roleEnum } from "./enum";

export const addEditConfig = {
  dialogWidth: "600px", // 弹窗宽度（不设则默认500px）
  formLabelWidth: "80px", // 表单label宽度（不设默认为100px）
  formItems: [
    {
      field: "username",
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名"
    },
    {
      field: "real_name",
      type: "input",
      label: "真实姓名",
      placeholder: "请输入真实姓名"
    },
    {
      field: "cellphone",
      type: "input",
      label: "手机号",
      placeholder: "请输入手机号"
    },
    {
      field: "role_id",
      defaultValue: "", // 默认选项值
      type: "select",
      label: "角色",
      placeholder: "请选择角色",
      options: roleEnum
    },
    {
      field: "password",
      hide: true, // 是否隐藏该表单
      defaultValue: "123456", // 默认值
      type: "input",
      label: "密码",
      placeholder: "请输入密码"
    },
    {
      field: "id",
      hide: true
    }
  ],
  // 表单验证规则
  formRules: {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 2, max: 10, message: "用户名要求2-10位", trigger: "blur" }
    ],
    real_name: [
      { required: true, message: "请输入真实姓名", trigger: "blur" },
      { min: 2, max: 10, message: "真实姓名要求2-10位", trigger: "blur" }
    ],
    cellphone: [
      {
        pattern: /^1[3-9]\d{9}$/,
        message: "手机号格式不正确",
        trigger: "blur"
      }
    ],
    role_id: [{ required: true, message: "请选择角色", trigger: "blur" }]
    // password: [
    //   { required: true, message: "请输入密码", trigger: "blur" },
    //   {
    //     pattern: /^[a-zA-Z0-9]{3,}$/,
    //     message: "密码必须是3位以上的字母或数字",
    //     trigger: "blur"
    //   }
    // ]
  }
};
