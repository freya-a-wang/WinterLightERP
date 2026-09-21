import { message } from 'antd'
import { feedbackMessages } from './feedbackMessages'
import { getErrorMessage } from './errorMessage'

/** 全局 Message 展示参数 */
export const APP_MESSAGE_CONFIG = {
  duration: 2.5,
  maxCount: 3,
  top: 72
} as const

let configured = false

/** 应用启动时调用一次，统一 Message 位置与堆叠策略 */
export function initAppMessage(): void {
  if (configured) {
    return
  }

  message.config(APP_MESSAGE_CONFIG)
  configured = true
}

type AppMessageContent = string

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/** 统一 antd Message 入口，错误类提示自动解析接口/异常信息 */
export const appMessage = {
  success(content: AppMessageContent): void {
    message.success(content)
  },

  warning(content: AppMessageContent): void {
    message.warning(content)
  },

  info(content: AppMessageContent): void {
    message.info(content)
  },

  error(contentOrError: unknown, fallback: string = feedbackMessages.common.operationFailed): void {
    const content = isNonEmptyString(contentOrError)
      ? contentOrError
      : getErrorMessage(contentOrError, fallback)

    message.error(content)
  }
}
