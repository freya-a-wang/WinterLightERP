import { Skeleton } from 'antd'
import { classNames } from '@/lib/classNames'
import styles from './index.module.less'

export type ListSkeletonVariant = 'avatarRow' | 'simpleRow' | 'tableRow'

export type ListSkeletonProps = {
  /** 骨架行数，默认 6 */
  count?: number
  /** 列表项布局变体 */
  variant?: ListSkeletonVariant
  className?: string
}

/** 列表加载占位：表格行 / 头像行 / 简单行，用于 useQuery 首次拉取 */
export default function ListSkeleton({
  count = 6,
  variant = 'tableRow',
  className
}: ListSkeletonProps): React.JSX.Element {
  const rows = Array.from({ length: count }, (_, index) => index)

  return (
    <div
      className={classNames(styles.root, className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="列表加载中"
    >
      {rows.map((index) => (
        <div key={index} className={styles.item}>
          {variant === 'avatarRow' ? (
            <>
              <Skeleton.Avatar active size={40} shape="circle" />
              <div className={styles.content}>
                <Skeleton active title={{ width: '36%' }} paragraph={{ rows: 1, width: '68%' }} />
              </div>
            </>
          ) : variant === 'simpleRow' ? (
            <Skeleton active title={{ width: '42%' }} paragraph={{ rows: 1, width: '80%' }} />
          ) : (
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1, width: ['18%', '28%', '22%', '16%'] }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
