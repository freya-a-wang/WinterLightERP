import { ApiError } from '@/api/apiError'
import type { ApiEnvelope } from '@/api/types'
import { env } from '@/lib/env'
import { queryClient } from '@/lib/queryClient'
import { useSessionStore } from '@/stores/sessionStore'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type HttpRequestOptions = {
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
  signal?: AbortSignal
  /** 为 true 时不携带 Token，且 401 不跳转登录（用于登录接口） */
  skipAuth?: boolean
}

const SUCCESS_CODE = 0
const UNAUTHORIZED_STATUS = 401

/** 将相对路径拼到接口前缀；绝对 URL 原样使用 */
function resolveRequestUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) {
    return url
  }

  const base = env.apiBaseUrl.replace(/\/$/, '')
  const path = url.startsWith('/') ? url : `/${url}`
  return `${base}${path}`
}

/** 合并超时与调用方传入的 AbortSignal */
function mergeAbortSignals(timeoutMs: number, userSignal?: AbortSignal): AbortSignal {
  const timeoutSignal = AbortSignal.timeout(timeoutMs)

  if (!userSignal) {
    return timeoutSignal
  }

  return AbortSignal.any([timeoutSignal, userSignal])
}

function isApiEnvelope(value: unknown): value is ApiEnvelope {
  return typeof value === 'object' && value !== null && typeof (value as ApiEnvelope).code === 'number'
}

function redirectToLogin(): void {
  if (window.location.pathname === '/login') {
    return
  }

  const currentPath = `${window.location.pathname}${window.location.search}`
  const redirectQuery =
    currentPath && currentPath !== '/' ? `?redirect=${encodeURIComponent(currentPath)}` : ''
  window.location.replace(`/login${redirectQuery}`)
}

/** 清理会话并跳转登录；登录接口 401 不调用，避免死循环 */
function handleUnauthorized(): void {
  useSessionStore.getState().resetSession()
  queryClient.clear()
  redirectToLogin()
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  const text = await response.text()
  return text || null
}

function throwApiError(
  status: number,
  response: Response,
  data: unknown,
  businessCode?: number
): never {
  const envelopeMessage =
    isApiEnvelope(data) && typeof data.message === 'string' && data.message.trim()
      ? data.message.trim()
      : undefined

  throw new ApiError(
    envelopeMessage ?? `Request failed with status ${status}`,
    status,
    response,
    data,
    businessCode
  )
}

/** 统一 HTTP 请求封装：解包 { code, data, message }，失败时抛出 ApiError */
export async function httpRequest<T>(url: string, options: HttpRequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers, signal, skipAuth = false } = options
  const token = skipAuth ? null : useSessionStore.getState().token

  const response = await fetch(resolveRequestUrl(url), {
    method,
    signal: mergeAbortSignals(env.apiTimeoutMs, signal),
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...headers
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  })

  const data = await parseResponseBody(response)

  if (response.status === UNAUTHORIZED_STATUS && !skipAuth) {
    handleUnauthorized()
    throwApiError(response.status, response, data)
  }

  if (!response.ok) {
    throwApiError(response.status, response, data)
  }

  if (!isApiEnvelope(data)) {
    throw new ApiError('接口响应格式无效', response.status, response, data)
  }

  if (data.code === UNAUTHORIZED_STATUS && !skipAuth) {
    handleUnauthorized()
    throwApiError(response.status, response, data, data.code)
  }

  if (data.code !== SUCCESS_CODE) {
    throwApiError(response.status, response, data, data.code)
  }

  return data.data as T
}
