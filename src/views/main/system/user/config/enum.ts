// 性别映射
export const sexMap: any = {
  man: "男",
  woman: "女"
};
// 性别枚举
export const sexEnum = [
  { value: "man", label: sexMap.man },
  { value: "woman", label: sexMap.woman }
];

// 角色映射
export const roleMap: any = {
  "1": "超级管理员",
  "2": "普通用户",
  "3": "访客"
};
// 角色枚举
export const roleEnum = [
  { value: 1, label: roleMap[1] },
  { value: 2, label: roleMap[2] },
  { value: 3, label: roleMap[3] }
];
