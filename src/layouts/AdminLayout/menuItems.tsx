import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  AccountBookOutlined,
  SettingOutlined
} from '@ant-design/icons'
import type { ItemType } from 'antd/es/menu/interface'
import { permissionCodes } from '@/lib/permissions'

const MENU_PERMISSIONS: Record<string, string> = {
  '/': permissionCodes.dashboardView,
  '/sales': permissionCodes.salesView,
  '/inventory': permissionCodes.inventoryView,
  '/finance': permissionCodes.financeView,
  '/system': permissionCodes.systemView
}

/** 侧栏菜单：路径与页面路由一一对应 */
export const adminMenuItems: ItemType[] = [
  {
    key: '/',
    icon: <AppstoreOutlined />,
    label: '工作台'
  },
  {
    key: '/sales',
    icon: <ShoppingCartOutlined />,
    label: '销售'
  },
  {
    key: '/inventory',
    icon: <InboxOutlined />,
    label: '库存'
  },
  {
    key: '/finance',
    icon: <AccountBookOutlined />,
    label: '财务'
  },
  {
    key: '/system',
    icon: <SettingOutlined />,
    label: '系统'
  }
]

/** 按当前用户权限码过滤侧栏，无权限的模块不展示 */
export function filterAdminMenuItems(permissions: string[]): ItemType[] {
  return adminMenuItems.filter((item) => {
    if (!item || typeof item !== 'object' || !('key' in item) || typeof item.key !== 'string') {
      return false
    }

    const required = MENU_PERMISSIONS[item.key]
    return !required || permissions.includes(required)
  })
}
