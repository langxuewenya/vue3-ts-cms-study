export const listTableConfig = {
  title: "用户", // 页面类型名称
  showIndexColumn: false, // 是否展示序号列
  showSelectColumn: false, // 是否可选行数据
  propList: [
    { prop: "username", label: "用户名", minWidth: "100px", align: "center" },
    {
      prop: "role_id",
      label: "角色",
      minWidth: "80px",
      align: "center",
      slotName: "role"
    },
    {
      prop: "cellphone",
      label: "手机号",
      minWidth: "100px",
      align: "center",
      slotName: "cellphone"
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
      prop: "create_time",
      label: "创建时间",
      minWidth: "100px",
      align: "center"
    },
    {
      prop: "update_time",
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
  ],
  // 分页配置
  pageInfo: { currentPage: 1, pageSize: 10 }
};
