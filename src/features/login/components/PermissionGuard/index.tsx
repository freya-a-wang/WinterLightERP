import { Navigate, Outlet } from 'react-router-dom'
import { usePermission } from '@/hooks/usePermission'

type PermissionGuardProps = {
  permission: string
}

/** 无对应权限时进入 403 页 */
export default function PermissionGuard({ permission }: PermissionGuardProps): React.JSX.Element {
  const allowed = usePermission(permission)

  if (!allowed) {
    return <Navigate to="/403" replace />
  }

  return <Outlet />
}
