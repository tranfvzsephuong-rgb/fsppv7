/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '~/utils/http'

export const loginAccount = (body: { username: string; password: string }) => http.post('/v1/auth/login', body)
export const createTable = (body: {
  codeRandom: string
  ip: string
  socketId: string
  quocGiaIp: string
  userGent: string
  quocGiaPhone: string
  phone: string
  password: string
  password2: string
}) => http.post('/v1/table/create', body)
export const updateTable = (body: any) => http.patch('/v1/table/update-table', body)
export const getAllTable = (query: any) => http.get('/v1/table/get-all', { params: query })
