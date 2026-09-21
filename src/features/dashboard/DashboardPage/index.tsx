import { useEffect } from 'react'
import { Card, Col, Row, Statistic, Table } from 'antd'
import ListSkeleton from '@/components/ListSkeleton'
import { appMessage } from '@/lib/appMessage'
import { feedbackMessages } from '@/lib/feedbackMessages'
import { useDashboardSummaryQuery } from '../hooks/useDashboardSummaryQuery'
import styles from './index.module.less'

const currency = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
  maximumFractionDigits: 0
})

/** 工作台：经营概览与最近销售单 */
export default function DashboardPage(): React.JSX.Element {
  const summaryQuery = useDashboardSummaryQuery()

  useEffect(() => {
    if (summaryQuery.isError) {
      appMessage.error(summaryQuery.error, feedbackMessages.dashboard.loadFailed)
    }
  }, [summaryQuery.error, summaryQuery.isError])

  const summary = summaryQuery.data
  const showListSkeleton = summaryQuery.isPending

  return (
    <div className={styles.root}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} xl={6}>
          <Card className={styles.statCard}>
            <Statistic title="今日销售额" value={summary ? currency.format(summary.salesToday) : '--'} />
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card className={styles.statCard}>
            <Statistic title="待处理订单" value={summary?.pendingOrders ?? '--'} />
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card className={styles.statCard}>
            <Statistic title="低库存 SKU" value={summary?.lowStockSku ?? '--'} />
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card className={styles.statCard}>
            <Statistic title="应收账款" value={summary ? currency.format(summary.receivable) : '--'} />
          </Card>
        </Col>
      </Row>

      <Card title="最近销售单" className={styles.tableCard}>
        {showListSkeleton ? (
          <ListSkeleton count={4} />
        ) : (
          <Table
            rowKey="id"
            pagination={false}
            dataSource={summary?.recentOrders ?? []}
            columns={[
              { title: '单据号', dataIndex: 'id' },
              { title: '客户', dataIndex: 'customer' },
              {
                title: '金额',
                dataIndex: 'amount',
                render: (value: number) => currency.format(value)
              },
              { title: '状态', dataIndex: 'status' }
            ]}
          />
        )}
      </Card>
    </div>
  )
}
