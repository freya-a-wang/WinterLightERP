import { ApiError } from '@/api/apiError'
import { feedbackMessages } from './feedbackMessages'

const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: '请求参数有误，请检查后重试',
  401: feedbackMessages.login.sessionExpired,
  403: '暂无权限执行此操作',
  404: '请求的资源不存在',
  408: feedbackMessages.common.networkTimeout,
  429: '操作过于频繁，请稍后再试',
  500: '服务暂时不可用，请稍后重试',
  502: '服务网关异常，请稍后重试',
  503: '服务繁忙，请稍后重试'
}

/** 从接口响应体中读取 msg / message 字段 */
export function extractApiResponseMessage(data: unknown): string | undefined {
  if (typeof data !== 'object' || data === null) {
    return undefined
  }

  const record = data as Record<string, unknown>

  for (const key of ['msg', 'message'] as const) {
    const value = record[key]

    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }

  return undefined
}

/** 按 HTTP 状态码返回语义化兜底文案 */
export function getHttpStatusMessage(
  status: number,
  fallback: string = feedbackMessages.common.requestFailed
): string {
  return HTTP_STATUS_MESSAGES[status] ?? fallback
}

/** 是否为超时/中断类网络错误 */
export function isTimeoutError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === 'AbortError' || error.message.toLowerCase().includes('timeout'))
  )
}

function isTechnicalErrorMessage(message: string): boolean {
  return /^Request failed with status \d+$/i.test(message.trim())
}

function isBrowserNetworkErrorMessage(message: string): boolean {
  const normalized = message.trim().toLowerCase()
  return (
    normalized.includes('failed to fetch') ||
    normalized.includes('networkerror') ||
    normalized.includes('network request failed') ||
    normalized.includes('load failed') ||
    normalized === 'network error'
  )
}

/** 从 unknown 错误中抽取用户可读消息 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (isTimeoutError(error)) {
    return feedbackMessages.common.networkTimeout
  }

  if (error instanceof ApiError) {
    return extractApiResponseMessage(error.data) ?? getHttpStatusMessage(error.status, fallback)
  }

  if (error instanceof Error) {
    const message = error.message.trim()

    if (!message || isTechnicalErrorMessage(message) || isBrowserNetworkErrorMessage(message)) {
      return fallback
    }

    return message
  }

  if (typeof error === 'string' && error.trim()) {
    const message = error.trim()
    if (isBrowserNetworkErrorMessage(message)) {
      return fallback
    }
    return message
  }

  return fallback
}
