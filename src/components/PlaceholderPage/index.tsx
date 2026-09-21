import { Card } from 'antd'

type PlaceholderPageProps = {
  title: string
  description: string
}

/** 模块占位页：业务接口接入前的空态 */
export default function PlaceholderPage({ title, description }: PlaceholderPageProps): React.JSX.Element {
  return (
    <Card title={title}>
      <p>{description}</p>
    </Card>
  )
}
