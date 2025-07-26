/**
 * 将首字母转成大写
 * @param value - 需将首字母转为大写的字符串
 * @returns 转化后的字符串
 */
export function capitalizeString(value: string) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}
