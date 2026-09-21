const DEFAULT_API_BASE_URL = '/api'
const DEFAULT_API_TIMEOUT_MS = 15_000

/** 将超时环境变量解析为正数毫秒，非法值回落到默认 */
function readTimeoutMs(raw: string | undefined): number {
  const parsed = Number(raw)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_API_TIMEOUT_MS
  }

  return parsed
}

/** 运行时环境配置，来自 Vite 环境变量 */
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
  apiTimeoutMs: readTimeoutMs(import.meta.env.VITE_API_TIMEOUT_MS)
} as const
