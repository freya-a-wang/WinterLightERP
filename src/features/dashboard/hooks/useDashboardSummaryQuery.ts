import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryKeys'
import { fetchDashboardSummary } from '../api/mockDashboard'

/** 工作台汇总：首次进入走 mock，后续可替换为真实接口 */
export function useDashboardSummaryQuery() {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: fetchDashboardSummary
  })
}
