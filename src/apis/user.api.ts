/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '~/utils/http'
import { Staff } from '~/components/Modal/CreateUserModal'

export const getAllStaff = (query: any) => http.get('v1/user/get-all-staff',{ params: query })
export const createStaff = (body: Staff) => http.post('v1/user/register-staff', body)
export const updateStaff = (id: string, body: any) => http.patch(`v1/user/${id}`, body)
export const updatePassStaff = (id: string, body: any) => http.patch(`v1/user/update-password-by-admin/${id}`, body)
export const deleteStaff = (id: string) => http.post(`v1/user/${id}`)
