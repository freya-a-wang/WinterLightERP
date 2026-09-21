import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

/** 无权限访问当前模块 */
export default function ForbiddenPage(): React.JSX.Element {
  const navigate = useNavigate()

  return (
    <Result
      status="403"
      title="暂无权限"
      subTitle="你没有访问该页面的权限，请联系管理员开通。"
      extra={
        <Button type="primary" onClick={() => void navigate('/')}>
          返回工作台
        </Button>
      }
    />
  )
}
