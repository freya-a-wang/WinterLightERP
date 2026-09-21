import { Button, Card, Form, Input } from 'antd'
import { useMemoizedFn } from 'ahooks'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { appMessage } from '@/lib/appMessage'
import { feedbackMessages } from '@/lib/feedbackMessages'
import { useSessionStore } from '@/stores/sessionStore'
import { useLoginMutation } from '../hooks/useLoginMutation'
import { getSafeRedirectPath } from '../lib/redirect'
import styles from './index.module.less'

type LoginFormValues = {
  username: string
  password: string
}

/** 登录页：mock 账号，接入真实接口后只替换 auth API */
export default function LoginPage(): React.JSX.Element {
  const token = useSessionStore((state) => state.token)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()

  const onFinish = useMemoizedFn(async (values: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync(values)
      appMessage.success(feedbackMessages.login.loginSuccess)
      void navigate(getSafeRedirectPath(searchParams.get('redirect')), { replace: true })
    } catch (error) {
      appMessage.error(error, feedbackMessages.login.loginFailed)
    }
  })

  if (token) {
    return <Navigate to={getSafeRedirectPath(searchParams.get('redirect'))} replace />
  }

  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>WL</span>
          <div>
            <h1 className={styles.title}>Winter Light ERP</h1>
            <p className={styles.subtitle}>请登录后继续</p>
          </div>
        </div>

        <Form<LoginFormValues>
          layout="vertical"
          requiredMark={false}
          onFinish={(values) => {
            void onFinish(values)
          }}
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input autoComplete="username" placeholder="请输入账号" size="large" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password autoComplete="current-password" placeholder="请输入密码" size="large" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loginMutation.isPending}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? '请稍后...' : '登录'}
          </Button>
        </Form>

        <p className={styles.hint}>演示账号：admin / admin123，只读：viewer / viewer123</p>
      </Card>
    </div>
  )
}
