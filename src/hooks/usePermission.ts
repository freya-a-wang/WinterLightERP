import { useSessionStore } from '@/stores/sessionStore'

/** 非组件环境读取当前会话是否具备某权限码 */
export function hasPermission(code: string): boolean {
  return useSessionStore.getState().permissions.includes(code)
}

/**
 * 组件内订阅权限。按钮级用法：`const canViewSales = usePermission(permissionCodes.salesView)`
 */
export function usePermission(code: string): boolean {
  const permissions = useSessionStore((state) => state.permissions)
  return permissions.includes(code)
}
