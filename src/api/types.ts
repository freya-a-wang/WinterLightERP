/** 统一接口信封，code === 0 表示成功 */
export type ApiEnvelope<T = unknown> = {
  code: number
  data: T
  message?: string
}
