import type { ReactNode } from 'react'
import { Empty } from 'antd'
import ListSkeleton from '@/components/ListSkeleton'
import { classNames } from '@/lib/classNames'
import styles from './index.module.less'

export type ListPageProps = {
  title?: string
  extra?: ReactNode
  filters?: ReactNode
  /** 首次加载且尚无列表数据时展示骨架 */
  loading?: boolean
  /** 无数据时展示空态，不要用 Spin 盖住列表 */
  isEmpty?: boolean
  emptyDescription?: string
  className?: string
  children: ReactNode
}

/** 列表页模板：筛选 + 操作 + 骨架/空态/表格 */
export default function ListPage({
  title,
  extra,
  filters,
  loading = false,
  isEmpty = false,
  emptyDescription = '暂无数据',
  className,
  children
}: ListPageProps): React.JSX.Element {
  return (
    <div className={classNames(styles.root, className)}>
      {title || extra ? (
        <div className={styles.toolbar}>
          {title ? <h2 className={styles.title}>{title}</h2> : <span />}
          {extra ? <div className={styles.extra}>{extra}</div> : null}
        </div>
      ) : null}

      {filters ? <div className={styles.filters}>{filters}</div> : null}

      <div className={styles.body}>
        {loading ? (
          <ListSkeleton />
        ) : isEmpty ? (
          <Empty description={emptyDescription} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          children
        )}
      </div>
    </div>
  )
}
