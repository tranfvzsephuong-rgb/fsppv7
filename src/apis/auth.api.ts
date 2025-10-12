import http from '~/utils/http'

export const loginAccount = (body: { username: string; password: string }) => http.post('/v1/auth/login', body)
export const getCountConnect = () => http.get('/v1/ip/count')
