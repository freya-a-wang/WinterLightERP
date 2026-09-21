import { Spin, type SpinProps } from 'antd'
import { classNames } from '@/lib/classNames'
import styles from './index.module.less'

export type AppLoadingVariant = 'inline' | 'overlay' | 'fullscreen'

export type AppLoadingProps = {
  tip?: string
  size?: SpinProps['size']
  variant?: AppLoadingVariant
  className?: string
}

/** 项目统一 Loading：品牌色 Spin + 语义布局变体 */
export default function AppLoading({
  tip,
  size = 'default',
  variant = 'inline',
  className
}: AppLoadingProps): React.JSX.Element {
  const isLarge = size === 'large'

  return (
    <div
      className={classNames(styles.root, styles[variant], isLarge && styles.large, className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spin size={size} description={tip} />
    </div>
  )
}
