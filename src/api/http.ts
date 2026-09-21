import { ApiError } from '@/api/apiError'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type HttpRequestOptions = {
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
  signal?: AbortSignal
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  const text = await response.text()
  return text || null
}

/** 统一 HTTP 请求封装，失败时抛出 ApiError */
export async function httpRequest<T>(url: string, options: HttpRequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers, signal } = options

  const response = await fetch(url, {
    method,
    signal,
    headers: {
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...headers
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  })

  const data = await parseResponseBody(response)

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status, response, data)
  }

  return data as T
}
