import { Suspense, useMemo } from 'react'
import { Breadcrumb, Dropdown, Layout, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useBoolean, useMemoizedFn } from 'ahooks'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import PageLoading from '@/components/PageLoading'
import { classNames } from '@/lib/classNames'
import { queryClient } from '@/lib/queryClient'
import { useSessionStore } from '@/stores/sessionStore'
import { filterAdminMenuItems } from './menuItems'
import styles from './index.module.less'

const PAGE_TITLES: Record<string, string> = {
  '/': '工作台',
  '/sales': '销售管理',
  '/inventory': '库存管理',
  '/finance': '财务管理',
  '/system': '系统设置',
  '/403': '暂无权限'
}

/** 管理端壳层：可折叠侧栏 + 面包屑 + 退出 */
export default function AdminLayout(): React.JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = useSessionStore((state) => state.currentUser)
  const permissions = useSessionStore((state) => state.permissions)
  const resetSession = useSessionStore((state) => state.resetSession)
  const [collapsed, { set: setCollapsed }] = useBoolean(false)
  const selectedKey = location.pathname === '/' ? '/' : `/${location.pathname.split('/')[1]}`
  const pageTitle = PAGE_TITLES[selectedKey] ?? '页面不存在'
  const menuItems = useMemo(() => filterAdminMenuItems(permissions), [permissions])

  const onMenuClick = useMemoizedFn(({ key }: { key: string }) => {
    if (key !== location.pathname) {
      void navigate(key)
    }
  })

  const onLogout = useMemoizedFn(() => {
    resetSession()
    queryClient.clear()
    void navigate('/login', { replace: true })
  })

  const breadcrumbItems =
    selectedKey === '/'
      ? [{ title: '工作台' }]
      : [{ title: <Link to="/">工作台</Link> }, { title: pageTitle }]

  return (
    <Layout className={styles.root}>
      <Layout.Sider
        className={styles.sider}
        width={232}
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className={classNames(styles.brand, collapsed && styles.brandCollapsed)}>
          <span className={styles.brandMark}>WL</span>
          {collapsed ? null : (
            <div>
              <div className={styles.brandName}>Winter Light</div>
              <div className={styles.brandSub}>ERP</div>
            </div>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={onMenuClick}
          className={styles.menu}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header className={styles.header}>
          <Breadcrumb items={breadcrumbItems} />
          <Dropdown
            menu={{
              items: [
                { key: 'password', label: '修改密码', disabled: true },
                { type: 'divider' },
                { key: 'logout', label: '退出登录', danger: true }
              ],
              onClick: ({ key }) => {
                if (key === 'logout') {
                  onLogout()
                }
              }
            }}
          >
            <button type="button" className={styles.userButton}>
              <span className={styles.user}>
                <span className={styles.userName}>{currentUser?.name ?? '未登录'}</span>
                <span className={styles.userRole}>{currentUser?.roleName ?? ''}</span>
              </span>
              <DownOutlined className={styles.userCaret} />
            </button>
          </Dropdown>
        </Layout.Header>
        <Layout.Content className={styles.content}>
          <Suspense fallback={<PageLoading tip="模块加载中" />}>
            <Outlet />
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
