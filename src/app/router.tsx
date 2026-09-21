import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthGuard from '@/features/auth/components/AuthGuard'
import LoginPage from '@/features/auth/LoginPage'
import AdminLayout from '@/layouts/AdminLayout'

const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'))
const SalesPage = lazy(() => import('@/features/sales/SalesPage'))
const InventoryPage = lazy(() => import('@/features/inventory/InventoryPage'))
const FinancePage = lazy(() => import('@/features/finance/FinancePage'))
const SystemPage = lazy(() => import('@/features/system/SystemPage'))

/** 应用路由：登录在守卫外，管理端路由需登录 */
export default function AppRouter(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AuthGuard />}>
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="system" element={<SystemPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
