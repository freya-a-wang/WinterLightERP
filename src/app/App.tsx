import { BrowserRouter } from 'react-router-dom'
import AppErrorBoundary from '@/components/AppErrorBoundary'
import { AppProviders } from '@/providers/AppProviders'
import AppRouter from './router'

/** 应用根：Provider + 错误边界 + 路由 */
export default function App(): React.JSX.Element {
  return (
    <AppProviders>
      <AppErrorBoundary>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AppErrorBoundary>
    </AppProviders>
  )
}
