/** 仅允许站内相对路径，避免开放重定向 */
export function getSafeRedirectPath(raw: string | null | undefined): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//') || raw.startsWith('/login')) {
    return '/'
  }

  return raw
}
