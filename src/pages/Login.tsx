/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { loginAccount } from '~/apis/auth.api'
import { AppContext } from '~/contexts/app.context'
import { toast } from 'react-toastify'

const Login = () => {
  const mutation = useMutation((body: any) => {
    return loginAccount(body)
  })
  const { setIsAuthenticated, setProfile } = React.useContext(AppContext)

  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formState)
    mutation.mutate(formState, {
      onSuccess: (dataUser) => {
        console.log(dataUser)
        const newUser = dataUser.data.user
        setProfile(newUser)
        toast.success('Đã đăng nhập thành công!')
        setIsAuthenticated(true)
        navigate('/admin/index')
      },
      onError: (data: any) => {
        toast.warn(data.response.data.errMessage)
        console.log(data.response.data.errMessage)
      }
    })
  }
  const initialFromState = {
    username: '',
    password: ''
  }
  const [formState, setFormState] = React.useState(initialFromState)
  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [name]: event.target.value }))
  }
  return (
    <div className='mt-8 max-w-[540px] md:max-w-[720px] lg:max-w-[960px] mx-auto p-3'>
      <h1 className='text-2xl font-bold mb-4'>Admin Page</h1>
      <form onSubmit={handleSubmit} className='flex gap-4 w-full'>
        <input
          type='text'
          id='txt_username'
          placeholder='Username'
          name='username'
          className='w-1/3 md:w-1/4 p-2 border rounded outline-none focus:ring focus:border-blue-500'
          value={formState.username}
          onChange={handleChange('username')}
        />
        <input
          type='password'
          id='txt_password'
          name='password'
          placeholder='Password'
          className='w-1/3 md:w-1/4 p-2 border rounded outline-none focus:ring focus:border-blue-500'
          value={formState.password}
          onChange={handleChange('password')}
        />
        <button type='submit' id='btn_login' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
