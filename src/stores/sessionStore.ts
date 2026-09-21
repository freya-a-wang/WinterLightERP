import { create } from 'zustand'

export type SessionUser = {
  id: string
  name: string
  roleName: string
}

type SessionState = {
  currentUser: SessionUser | null
  token: string | null
  setCurrentUser: (user: SessionUser | null) => void
  resetSession: () => void
}

/** 登录会话：跨页保留当前操作员；token 供 HTTP 层读取 */
export const useSessionStore = create<SessionState>((set) => ({
  currentUser: {
    id: 'demo-admin',
    name: '林晓冬',
    roleName: '系统管理员'
  },
  token: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  resetSession: () => set({ currentUser: null, token: null })
}))
