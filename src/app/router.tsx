import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthGuard from '@/features/auth/components/AuthGuard'
import PermissionGuard from '@/features/auth/components/PermissionGuard'
import LoginPage from '@/features/auth/LoginPage'
import AdminLayout from '@/layouts/AdminLayout'
import { permissionCodes } from '@/lib/permissions'

const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'))
const SalesPage = lazy(() => import('@/features/sales/SalesPage'))
const InventoryPage = lazy(() => import('@/features/inventory/InventoryPage'))
const FinancePage = lazy(() => import('@/features/finance/FinancePage'))
const SystemPage = lazy(() => import('@/features/system/SystemPage'))
const ForbiddenPage = lazy(() => import('@/features/error/ForbiddenPage'))
const NotFoundPage = lazy(() => import('@/features/error/NotFoundPage'))

/** 应用路由：登录在守卫外，管理端按权限码拦截 */
export default function AppRouter(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AuthGuard />}>
        <Route element={<AdminLayout />}>
          <Route element={<PermissionGuard permission={permissionCodes.dashboardView} />}>
            <Route index element={<DashboardPage />} />
          </Route>
          <Route element={<PermissionGuard permission={permissionCodes.salesView} />}>
            <Route path="sales" element={<SalesPage />} />
          </Route>
          <Route element={<PermissionGuard permission={permissionCodes.inventoryView} />}>
            <Route path="inventory" element={<InventoryPage />} />
          </Route>
          <Route element={<PermissionGuard permission={permissionCodes.financeView} />}>
            <Route path="finance" element={<FinancePage />} />
          </Route>
          <Route element={<PermissionGuard permission={permissionCodes.systemView} />}>
            <Route path="system" element={<SystemPage />} />
          </Route>
          <Route path="403" element={<ForbiddenPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
