// 菜单类型
export const menuType = {
  first: "1",
  second: "2"
};
// 菜单类型映射
export const menuTypeMap: any = {
  [menuType.first]: "一级",
  [menuType.second]: "二级"
};
// 菜单类型枚举
export const menuTypeEnum = [
  { value: menuType.first, label: menuTypeMap[1] },
  { value: menuType.second, label: menuTypeMap[2] }
];
