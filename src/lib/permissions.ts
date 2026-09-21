/** 菜单与路由使用的查看权限码 */
export const permissionCodes = {
  dashboardView: 'dashboard:view',
  salesView: 'sales:view',
  inventoryView: 'inventory:view',
  financeView: 'finance:view',
  systemView: 'system:view'
} as const

export type PermissionCode = (typeof permissionCodes)[keyof typeof permissionCodes]

/** 系统管理员默认拥有的全部查看权限 */
export const allViewPermissions: PermissionCode[] = [
  permissionCodes.dashboardView,
  permissionCodes.salesView,
  permissionCodes.inventoryView,
  permissionCodes.financeView,
  permissionCodes.systemView
]
