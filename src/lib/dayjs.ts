import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import 'dayjs/locale/zh-cn'

dayjs.extend(customParseFormat)
dayjs.extend(duration)
dayjs.locale('zh-cn')

export { dayjs }

/** 当前毫秒时间戳 */
export function nowMs(): number {
  return dayjs().valueOf()
}

/** 展示用日期时间 YYYY-MM-DD HH:mm */
export function formatDateTime(value?: string | number | Date): string {
  return dayjs(value).format('YYYY-MM-DD HH:mm')
}

/** 展示用日期 YYYY-MM-DD */
export function formatDate(value?: string | number | Date): string {
  return dayjs(value).format('YYYY-MM-DD')
}
