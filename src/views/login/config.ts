export const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: "用户名要求是5-10位的字母或数字",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: "密码必须是3位以上的字母或数字",
      trigger: "blur"
    }
  ]
};
