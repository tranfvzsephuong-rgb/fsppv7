/* eslint-disable @typescript-eslint/no-explicit-any */

export const setAccesTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const getChatFromLS = () => {
  const result = localStorage.getItem('chat')
  return result ? JSON.parse(result) : null
}
export const getFakeChatFromLS = () => {
  const result = localStorage.getItem('fakechat')
  return result ? JSON.parse(result) : null
}

export const getDarkModeFromLS = () => {
  const result = localStorage.getItem('darkmode')
  return result ? JSON.parse(result) : null
}

export const setProfileFromLS = (profile: any) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
export const setChatToLS = (arr: any) => {
  localStorage.setItem('chat', JSON.stringify(arr))
}
export const setFakeChatToLS = () => {
  localStorage.setItem('fakechat', JSON.stringify(['true']))
}
export const setDarkModeFromLS = (dark: boolean) => {
  localStorage.setItem('darkmode', JSON.stringify(dark))
}
