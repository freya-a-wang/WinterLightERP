import { create } from 'zustand'

const SESSION_STORAGE_KEY = 'wl-erp-session'

export type SessionUser = {
  id: string
  name: string
  roleName: string
}

export type SessionSnapshot = {
  currentUser: SessionUser
  token: string
  permissions: string[]
}

type SessionState = {
  currentUser: SessionUser | null
  token: string | null
  permissions: string[]
  setSession: (session: SessionSnapshot) => void
  resetSession: () => void
}

type PersistedSession = SessionSnapshot

function canUseSessionStorage(): boolean {
  return typeof sessionStorage !== 'undefined'
}

function isSessionUser(value: unknown): value is SessionUser {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const record = value as Record<string, unknown>
  return (
    typeof record.id === 'string' &&
    typeof record.name === 'string' &&
    typeof record.roleName === 'string'
  )
}

function isPersistedSession(value: unknown): value is PersistedSession {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const record = value as Record<string, unknown>
  return (
    isSessionUser(record.currentUser) &&
    typeof record.token === 'string' &&
    record.token.length > 0 &&
    Array.isArray(record.permissions) &&
    record.permissions.every((item) => typeof item === 'string')
  )
}

/** 从 sessionStorage 恢复会话；格式非法时清空 */
function readPersistedSession(): PersistedSession | null {
  if (!canUseSessionStorage()) {
    return null
  }

  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed: unknown = JSON.parse(raw)
    if (!isPersistedSession(parsed)) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY)
      return null
    }

    return parsed
  } catch {
    sessionStorage.removeItem(SESSION_STORAGE_KEY)
    return null
  }
}

function persistSession(session: PersistedSession): void {
  if (!canUseSessionStorage()) {
    return
  }

  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
}

function clearPersistedSession(): void {
  if (!canUseSessionStorage()) {
    return
  }

  sessionStorage.removeItem(SESSION_STORAGE_KEY)
}

const persistedSession = readPersistedSession()

/** 登录会话：token / 权限随用户写入 sessionStorage，关闭标签即清除 */
export const useSessionStore = create<SessionState>((set) => ({
  currentUser: persistedSession?.currentUser ?? null,
  token: persistedSession?.token ?? null,
  permissions: persistedSession?.permissions ?? [],
  setSession: (session) => {
    persistSession(session)
    set(session)
  },
  resetSession: () => {
    clearPersistedSession()
    set({ currentUser: null, token: null, permissions: [] })
  }
}))
