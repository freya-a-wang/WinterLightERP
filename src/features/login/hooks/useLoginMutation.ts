import { useMutation } from '@tanstack/react-query'
import { useSessionStore } from '@/stores/sessionStore'
import { loginWithMock } from '../api/mockAuth'

/** 登录：成功后写入会话（sessionStorage） */
export function useLoginMutation() {
  return useMutation({
    mutationFn: loginWithMock,
    onSuccess: (result) => {
      useSessionStore.getState().setSession({
        currentUser: result.user,
        token: result.token,
        permissions: result.permissions
      })
    }
  })
}
