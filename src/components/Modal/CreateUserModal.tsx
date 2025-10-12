/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from 'react-query'
import { createStaff } from '~/apis/user.api'
export interface Staff {
  username: string
  password: string
  name: string
  phone: string
  email: string
}
const CreateUserModal = ({ isOpen, onClose, data }: any) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [staffData, setStaffData] = useState<any[]>([])
  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }
  const initialFromState = {
    username: '',
    password: '',
    name: '',
    phone: '',
    email: ''
  }
  const queryClient = useQueryClient()
  const mutation = useMutation((body: any) => {
    return createStaff(body)
  })
  const [formState, setFormState] = useState(initialFromState)
  useEffect(() => {
    setFormState(data)
  }, [data])
  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [name]: event.target.value }))
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate(formState, {
      onSuccess: (createdData) => {
        queryClient.invalidateQueries({ queryKey: ['user', 3] })
        setFormState(initialFromState)
        setStaffData([...staffData, createdData])
        toast.success('Thành công!')
        onClose()
      },
      onError: (error: any) => {
        toast.warn(error?.response.data.errMessage)
      }
    })
  }
  return (
    <div
      id='authentication-modal'
      tabIndex={-1}
      aria-hidden='true'
      onClick={handleModalClick}
      className={` ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } fixed bg-[#03030ca8] ::bg-[#ffffff46] top-0 left-0 right-0 z-50 w-[100vw] p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100vh] transition-all`}
    >
      <div
        ref={modalRef}
        className={`relative ${isOpen ? 'top-[250px]' : 'top-[-20px]'
          } z-100 w-full left-[50%] duration-500 transition-all translate-y-[-50%] translate-x-[-50%] max-w-[498px] max-h-full`}
      >
        <div className='relative bg-white  shadow dark:bg-[#2c2c39] dark:text-white p-4'>
          <form className='space-y-1' action='#' autoComplete='false' onSubmit={(e) => handleSubmit(e)}>
            <h2 className='text-2xl font-semibold text-[#3a3a49] dark:text-white text-center'>Thêm mới người dùng</h2>

            <div className='flex flex-col mb-3'>
              <label className='text-[15px]'>Tên đăng nhập</label>
              <input
                className='mt-2 focus:ring-1 dark:border-gray-500 focus:shadow-lg shadow-slate-600  focus:ring-purple-400 dark:focus:ring-blue-800 dark:focus:border-blue-800 transition-all text-[15px] px-[14px] pt-[6px] pb-[8px] disabled:bg-[#e7e7e9] border'
                type='text'
                placeholder='Username'
                value={formState?.username !== '' ? formState?.username : data?.username}
                onChange={handleChange('username')}
              />
            </div>
            <div className='flex flex-col pb-3 border-b dark:border-b-gray-500'>
              <label className='text-[15px]'>Mật khẩu</label>
              <input
                className='mt-2 focus:ring-1 dark:border-gray-500 focus:shadow-md shadow-slate-600  focus:ring-purple-400 dark:focus:ring-blue-800 dark:focus:border-blue-800 transition-all text-[15px] px-[14px] pt-[6px] pb-[8px] disabled:bg-[#e7e7e9] border'
                type='password'
                placeholder='Mật khẩu'
                value={formState?.password !== '' ? formState?.password : data?.password}
                onChange={handleChange('password')}
              />
            </div>
            <div className='flex flex-col mb-3 mt-3'>
              <label className='text-[15px]'>Họ và tên</label>
              <input
                className='mt-2 focus:ring-1 dark:border-gray-500 focus:shadow-lg shadow-slate-600  focus:ring-purple-400 dark:focus:ring-blue-800 dark:focus:border-blue-800 transition-all text-[15px] px-[14px] pt-[6px] pb-[8px] disabled:bg-[#e7e7e9] border'
                type='text'
                placeholder='Họ tên'
                value={formState?.name !== '' ? formState?.name : data?.name}
                onChange={handleChange('name')}
              />
            </div>
            <div className='flex flex-col mb-3'>
              <label className='text-[15px]'>Điện thoại</label>
              <input
                className='mt-2 focus:ring-1 dark:border-gray-500 focus:shadow-lg shadow-slate-600  focus:ring-purple-400 dark:focus:ring-blue-800 dark:focus:border-blue-800 transition-all text-[15px] px-[14px] pt-[6px] pb-[8px] disabled:bg-[#e7e7e9] border'
                type='text'
                placeholder='Điện thoại'
                value={formState?.phone !== '' ? formState?.phone : data?.phone}
                onChange={handleChange('phone')}
              />
            </div>
            <div className='flex flex-col pb-3 border-b dark:border-b-gray-500'>
              <label className='text-[15px]'>Email</label>
              <input
                className='mt-2 focus:ring-1 dark:border-gray-500 focus:shadow-md shadow-slate-600  focus:ring-purple-400 dark:focus:ring-blue-800 dark:focus:border-blue-800 transition-all text-[15px] px-[14px] pt-[6px] pb-[8px] disabled:bg-[#e7e7e9] border'
                type='email'
                placeholder='Email'
                value={formState?.email !== '' ? formState?.email : data?.email}
                onChange={handleChange('email')}
              />
            </div>
            <button className='text-white bg-[#44f] hover:bg-[#3333bf] transition-all mt-3 py-2 px-3 pb-3'>Thêm</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateUserModal
