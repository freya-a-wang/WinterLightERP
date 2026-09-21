import { BrowserRouter } from 'react-router-dom'
import { AppProviders } from '@/providers/AppProviders'
import AppRouter from './router'

/** 应用根：Provider + 路由 */
export default function App(): React.JSX.Element {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppProviders>
  )
}
