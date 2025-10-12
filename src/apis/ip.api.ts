import http from '~/utils/http'

export const createIp = (body: unknown) => http.post('/v1/ip/create', body)
export const getBlackList = () => http.get('/v1/ip/getAll')
export const deleteBlackItem = (id: string) => http.post(`/v1/ip/delete?id=${id}`)

export const createIpCountry = (body: unknown) => http.post('/v1/ip/create-code', body)
export const getBlackListCountry = () => http.get('/v1/ip/get-all-code')
export const deleteBlackItemCountry = (id: string) => http.post(`/v1/ip/delete-code?id=${id}`)
