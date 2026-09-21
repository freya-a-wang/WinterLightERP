import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

/** 未知路径：展示 404，不再静默送回首页 */
export default function NotFoundPage(): React.JSX.Element {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="页面不存在"
      subTitle="你访问的地址没有对应页面。"
      extra={
        <Button type="primary" onClick={() => void navigate('/')}>
          返回工作台
        </Button>
      }
    />
  )
}
