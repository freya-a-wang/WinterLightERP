/** React Query 缓存键，按资源域划分 */
export const queryKeys = {
  session: ['session'] as const,
  dashboardSummary: ['dashboard-summary'] as const,
  salesOrders: ['sales-orders'] as const,
  inventoryList: ['inventory-list'] as const,
  purchaseOrders: ['purchase-orders'] as const,
  financeSummary: ['finance-summary'] as const
} as const
