/** 用户可读的统一提示文案 */
export const feedbackMessages = {
  common: {
    networkTimeout: '请求超时，请检查网络后重试',
    networkUnavailable: '网络不可用，请检查网络连接',
    operationFailed: '操作失败，请稍后重试',
    requestFailed: '服务请求失败，请稍后重试',
    saveSuccess: '保存成功',
    deleteSuccess: '删除成功'
  },
  login: {
    loginSuccess: '登录成功',
    loginFailed: '登录失败，请检查账号或密码',
    sessionExpired: '登录状态已失效，请重新登录'
  },
  dashboard: {
    loadFailed: '工作台数据加载失败，请稍后重试'
  }
} as const
