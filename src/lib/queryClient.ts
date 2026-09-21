import { QueryClient } from '@tanstack/react-query'

/** 全局 React Query 客户端：窗口聚焦不自动刷新，失败重试 1 次 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30_000
    }
  }
})
