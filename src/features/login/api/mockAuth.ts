import { feedbackMessages } from '@/lib/feedbackMessages'
import { allViewPermissions, permissionCodes } from '@/lib/permissions'
import type { SessionUser } from '@/stores/sessionStore'

export type LoginPayload = {
  username: string
  password: string
}

export type LoginResult = {
  user: SessionUser
  token: string
  permissions: string[]
}

type MockAccount = {
  username: string
  password: string
  user: SessionUser
  token: string
  permissions: string[]
}

const MOCK_ACCOUNTS: MockAccount[] = [
  {
    username: 'admin',
    password: 'admin123',
    user: {
      id: 'admin',
      name: '林晓冬',
      roleName: '系统管理员'
    },
    token: 'wl-mock-token-admin',
    permissions: [...allViewPermissions]
  },
  {
    username: 'viewer',
    password: 'viewer123',
    user: {
      id: 'viewer',
      name: '陈观微',
      roleName: '只读访客'
    },
    token: 'wl-mock-token-viewer',
    permissions: [permissionCodes.dashboardView]
  }
]

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

/** mock 登录，后续接入真实接口时只替换此函数 */
export async function loginWithMock(payload: LoginPayload): Promise<LoginResult> {
  await wait(300)

  const username = payload.username.trim()
  const account = MOCK_ACCOUNTS.find(
    (item) => item.username === username && item.password === payload.password
  )

  if (!account) {
    throw new Error(feedbackMessages.login.loginFailed)
  }

  return {
    user: account.user,
    token: account.token,
    permissions: account.permissions
  }
}
