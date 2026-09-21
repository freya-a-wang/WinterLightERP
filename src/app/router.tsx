import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '@/layouts/AdminLayout'

const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'))
const SalesPage = lazy(() => import('@/features/sales/SalesPage'))
const InventoryPage = lazy(() => import('@/features/inventory/InventoryPage'))
const FinancePage = lazy(() => import('@/features/finance/FinancePage'))
const SystemPage = lazy(() => import('@/features/system/SystemPage'))

/** 应用路由：管理端布局下挂各业务模块 */
export default function AppRouter(): React.JSX.Element {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="finance" element={<FinancePage />} />
        <Route path="system" element={<SystemPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
