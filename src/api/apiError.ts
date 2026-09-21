/** HTTP 请求失败时抛出的结构化错误 */
export class ApiError extends Error {
  readonly status: number
  readonly response: Response
  readonly data: unknown

  constructor(message: string, status: number, response: Response, data: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.response = response
    this.data = data
  }
}
