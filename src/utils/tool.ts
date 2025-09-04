/**
 * 将首字母转成大写
 * @param value - 需将首字母转为大写的字符串
 * @returns 转化后的字符串
 */
export function capitalizeString(value: string) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * 将菜单列表转为树形模式
 * @param menuList
 */
export function menuListToTree(menuList: any[]) {
  const ret: any = [];
  // 一级菜单
  menuList.map((item) => {
    if (item.type === "1") {
      ret.push({
        ...item,
        children: []
      });
    }
  });
  // 二级菜单
  menuList.map((item) => {
    if (item.type === "2") {
      const index = ret.findIndex((i: any) => i.id == item.parent_id);
      if (index > -1) {
        ret[index].children.push(item);
      } else {
        ret.push(item);
      }
    }
  });
  return ret;
}
