import { menuTypeMap } from "./enum";

export const listTableConfig = {
  title: "菜单列表",
  propList: [
    { prop: "name", label: "菜单名称", minWidth: "100px", align: "center" },
    {
      prop: "type",
      label: "类型",
      width: "100px",
      align: "center",
      slotName: "type",
      isEnum: true, // 是否有枚举
      optionMap: menuTypeMap // 菜单类型枚举映射
    },
    { prop: "url", label: "菜单路径", minWidth: "100px", align: "center" },
    // {
    //   prop: "createTime",
    //   label: "创建时间",
    //   minWidth: "100px",
    //   align: "center",
    //   slotName: "createTime"
    // },
    {
      label: "操作",
      minWidth: "100px",
      align: "center",
      slotName: "handler"
    }
  ],
  treePropsConfig: {
    rowKey: "id",
    treeProp: {
      children: "children"
    }
  },
  showFooter: false
};
