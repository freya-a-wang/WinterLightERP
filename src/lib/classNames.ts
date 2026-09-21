/** 拼接 className，过滤空值 */
export function classNames(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
