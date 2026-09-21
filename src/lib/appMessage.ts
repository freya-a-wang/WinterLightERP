import { feedbackMessages } from './feedbackMessages'
import { getErrorMessage } from './errorMessage'

/** 全局 Message 展示参数，交给 AntdApp 而不是静态 message.config */
export const APP_MESSAGE_CONFIG = {
  duration: 2.5,
  maxCount: 3,
  top: 72
} as const

type AppMessageApi = {
  success: (content: string) => void
  warning: (content: string) => void
  info: (content: string) => void
  error: (content: string) => void
}

let messageApi: AppMessageApi | null = null

/** 在 AntdApp 子树内绑定 useApp().message */
export function bindAppMessage(api: AppMessageApi): void {
  messageApi = api
}

/** 卸载时解除绑定，避免持有过期实例 */
export function unbindAppMessage(): void {
  messageApi = null
}

function getMessageApi(): AppMessageApi | null {
  return messageApi
}

type AppMessageContent = string

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/** 统一 antd Message 入口，错误类提示自动解析接口/异常信息 */
export const appMessage = {
  success(content: AppMessageContent): void {
    getMessageApi()?.success(content)
  },

  warning(content: AppMessageContent): void {
    getMessageApi()?.warning(content)
  },

  info(content: AppMessageContent): void {
    getMessageApi()?.info(content)
  },

  error(contentOrError: unknown, fallback: string = feedbackMessages.common.operationFailed): void {
    const content = isNonEmptyString(contentOrError)
      ? contentOrError
      : getErrorMessage(contentOrError, fallback)

    getMessageApi()?.error(content)
  }
}
