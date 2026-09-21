import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSessionStore } from '@/stores/sessionStore'

/** 未登录跳转登录页，并带上原路径以便登录后返回 */
export default function AuthGuard(): React.JSX.Element {
  const token = useSessionStore((state) => state.token)
  const location = useLocation()

  if (!token) {
    const redirect = `${location.pathname}${location.search}`
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />
  }

  return <Outlet />
}
