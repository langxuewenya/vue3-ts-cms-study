import dayjs from "dayjs";

// 默认的时间转换格式
const DEFAULT_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

/**
 * 时间格式化
 * @param value - 需要格式化的时间，可以是字符串或时间戳
 * @param format - 可选，格式化模板，默认值为 "YYYY-MM-DD HH:mm:ss"
 * @returns 格式化后的时间字符串
 */
export function formatDateTime(
  value: string | number,
  format: string = DEFAULT_DATE_TIME_FORMAT
) {
  return dayjs(value).format(format);
}
