import { Suspense } from 'react'
import { Layout, Menu } from 'antd'
import { useMemoizedFn } from 'ahooks'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import PageLoading from '@/components/PageLoading'
import { useSessionStore } from '@/stores/sessionStore'
import { adminMenuItems } from './menuItems'
import styles from './index.module.less'

const PAGE_TITLES: Record<string, string> = {
  '/': '工作台',
  '/sales': '销售管理',
  '/inventory': '库存管理',
  '/finance': '财务管理',
  '/system': '系统设置'
}

/** 管理端壳层：侧栏导航 + 顶栏当前页标题 + 内容区 */
export default function AdminLayout(): React.JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = useSessionStore((state) => state.currentUser)
  const selectedKey = location.pathname === '/' ? '/' : `/${location.pathname.split('/')[1]}`
  const pageTitle = PAGE_TITLES[selectedKey] ?? 'Winter Light ERP'

  const onMenuClick = useMemoizedFn(({ key }: { key: string }) => {
    if (key !== location.pathname) {
      void navigate(key)
    }
  })

  return (
    <Layout className={styles.root}>
      <Layout.Sider className={styles.sider} width={232} theme="light">
        <div className={styles.brand}>
          <span className={styles.brandMark}>WL</span>
          <div>
            <div className={styles.brandName}>Winter Light</div>
            <div className={styles.brandSub}>ERP</div>
          </div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={adminMenuItems}
          onClick={onMenuClick}
          className={styles.menu}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header className={styles.header}>
          <h1 className={styles.title}>{pageTitle}</h1>
          <div className={styles.user}>
            <span className={styles.userName}>{currentUser?.name ?? '未登录'}</span>
            <span className={styles.userRole}>{currentUser?.roleName ?? ''}</span>
          </div>
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
