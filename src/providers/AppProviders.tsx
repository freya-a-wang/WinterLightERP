import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { App as AntdApp, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useLayoutEffect, type PropsWithChildren } from 'react'
import { APP_MESSAGE_CONFIG, bindAppMessage, unbindAppMessage } from '@/lib/appMessage'
import { queryClient } from '@/lib/queryClient'

/** 把 AntdApp 上下文中的 message 交给 appMessage */
function AppMessageBridge(): null {
  const { message } = AntdApp.useApp()

  useLayoutEffect(() => {
    bindAppMessage(message)
    return () => {
      unbindAppMessage()
    }
  }, [message])

  return null
}

/** 全局 Provider：Ant Design 中文主题、React Query、Message 初始化 */
export function AppProviders({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#3d7ea6',
          colorSuccess: '#2f9e7a',
          colorWarning: '#c9892b',
          colorError: '#c45c5c',
          colorText: '#1b2430',
          colorBgLayout: '#f3f6fa',
          borderRadius: 8,
          fontFamily:
            "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif"
        }
      }}
    >
      <AntdApp message={APP_MESSAGE_CONFIG}>
        <AppMessageBridge />
        <QueryClientProvider client={queryClient}>
          {children}
          {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
        </QueryClientProvider>
      </AntdApp>
    </ConfigProvider>
  )
}
