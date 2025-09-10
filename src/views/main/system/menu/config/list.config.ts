import { menuTypeMap } from "./enum";

// 根据是否有 children 判断是不是一级节点
const tableRowClassName = ({ row }: { row: any }) => {
  if (row.children && row.children.length > 0) {
    return "tree-first-level-row";
  }
  return "";
};

export const listTableConfig = {
  title: "菜单",
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
    { prop: "path", label: "菜单路径", minWidth: "120px", align: "center" },
    {
      prop: "create_time",
      label: "创建时间",
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
  // 树形字段配置
  treePropsConfig: {
    rowKey: "id",
    treeProp: {
      children: "children"
    },
    "row-class-name": tableRowClassName
  },
  showFooter: false,
  // 分页配置
  pageInfo: { currentPage: 1, pageSize: 9999 }
};
