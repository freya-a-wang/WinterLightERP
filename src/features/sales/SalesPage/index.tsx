import { Button, Input, Table } from 'antd'
import ListPage from '@/components/ListPage'

const PLACEHOLDER_COLUMNS = [
  { title: '单据号', dataIndex: 'id' },
  { title: '客户', dataIndex: 'customer' },
  { title: '金额', dataIndex: 'amount' },
  { title: '状态', dataIndex: 'status' }
]

/** 销售订单占位：接入列表模板，暂无业务数据 */
export default function SalesPage(): React.JSX.Element {
  return (
    <ListPage
      title="销售订单"
      extra={
        <Button type="primary" disabled>
          新建
        </Button>
      }
      filters={<Input placeholder="搜索客户或单据号" disabled allowClear style={{ width: 240 }} />}
      isEmpty
      emptyDescription="业务接口接入后在此展示"
    >
      <Table rowKey="id" pagination={false} dataSource={[]} columns={PLACEHOLDER_COLUMNS} />
    </ListPage>
  )
}
