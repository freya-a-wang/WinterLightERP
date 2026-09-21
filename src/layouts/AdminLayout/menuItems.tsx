import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  AccountBookOutlined,
  SettingOutlined
} from '@ant-design/icons'
import type { ItemType } from 'antd/es/menu/interface'

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
