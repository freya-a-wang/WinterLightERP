import AppLoading from '../AppLoading'

type PageLoadingProps = {
  tip?: string
}

/** 路由懒加载时的全屏 Loading 占位 */
export default function PageLoading({ tip = '页面加载中' }: PageLoadingProps): React.JSX.Element {
  return <AppLoading variant="fullscreen" size="large" tip={tip} />
}
