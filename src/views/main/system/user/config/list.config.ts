export const listTableConfig = {
  title: "用户列表", // 表格左上方标题
  showIndexColumn: false, // 是否展示序号列
  showSelectColumn: false, // 是否可选行数据
  propList: [
    { prop: "username", label: "用户名", minWidth: "100px", align: "center" },
    {
      prop: "role",
      label: "角色",
      minWidth: "80px",
      align: "center",
      slotName: "role"
    },
    {
      prop: "phone",
      label: "手机号",
      minWidth: "100px",
      align: "center",
      slotName: "phone"
    },
    // {
    //   prop: "sex",
    //   label: "性别",
    //   width: "100px",
    //   align: "center",
    //   slotName: "sex",
    //   isEnum: true, // 是否有枚举
    //   optionMap: sexMap // 性别枚举映射
    // },
    {
      prop: "createTime",
      label: "创建时间",
      minWidth: "100px",
      align: "center"
    },
    {
      prop: "updateTime",
      label: "更新时间",
      minWidth: "100px",
      align: "center"
    },
    {
      label: "操作",
      minWidth: "100px",
      align: "center",
      slotName: "handler"
    }
  ]
};
