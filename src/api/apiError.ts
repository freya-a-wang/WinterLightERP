/** HTTP 请求失败时抛出的结构化错误 */
export class ApiError extends Error {
  readonly status: number
  readonly response: Response | null
  readonly data: unknown
  readonly businessCode: number | undefined

  constructor(
    message: string,
    status: number,
    response: Response | null,
    data: unknown,
    businessCode?: number
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.response = response
    this.data = data
    this.businessCode = businessCode
  }
}
