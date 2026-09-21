export type DashboardSummary = {
  salesToday: number
  pendingOrders: number
  lowStockSku: number
  receivable: number
  recentOrders: Array<{
    id: string
    customer: string
    amount: number
    status: string
  }>
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

/** 工作台 mock 数据，后续接入接口时仅替换此函数 */
export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  await wait(400)

  return {
    salesToday: 128600,
    pendingOrders: 17,
    lowStockSku: 6,
    receivable: 86400,
    recentOrders: [
      { id: 'SO-20260921-001', customer: '北境贸易', amount: 18600, status: '待发货' },
      { id: 'SO-20260921-002', customer: '霜叶商行', amount: 9200, status: '已收款' },
      { id: 'SO-20260920-018', customer: '冬青零售', amount: 15480, status: '生产中' },
      { id: 'SO-20260920-014', customer: '暖灯工作室', amount: 6300, status: '待审核' }
    ]
  }
}
