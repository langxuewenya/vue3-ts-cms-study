export const roleListTableConfig = {
  title: "角色",
  propList: [
    { prop: "name", label: "角色名称", minWidth: "100px", align: "center" },
    { prop: "remark", label: "角色备注", minWidth: "120px", align: "center" },
    {
      label: "操作",
      minWidth: "100px",
      align: "center",
      slotName: "handler"
    }
  ],
  // 分页配置
  pageInfo: {
    currentPage: 1,
    pageSize: 10,
    layout: "total, prev, pager, next"
  }
};
