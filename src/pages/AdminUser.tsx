/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateUserModal from '~/components/Modal/CreateUserModal'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import UpdateUserModal from '~/components/Modal/UpdateUserModal'
import { deleteStaff, getAllStaff, updateStaff } from '~/apis/user.api'
import ChangePasswordModal from '~/components/Modal/ChangePasswordModal'
const AdminUser = () => {
  const [showCreate, setShowCreate] = useState(false)
  // const [staffData, setStaffData] = useState<any[]>([])
  const [showUpdate, setShowUpdate] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [staff, setStaff] = useState<any>([])
  // const [count, setCount] = useState<any>([])
  const [userTemp, setUserTemp] = useState()
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteStaff(id)
  })
  const queryClient = useQueryClient()
  const updateMutation = useMutation((params: { id: string; status: string }) => {
    return updateStaff(params.id, { status: params.status })
  })

  const handledeleteStaff = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Đã xoá!')
        queryClient.invalidateQueries({ queryKey: ['user', 3] })
      },
      onError: () => {
        toast.warn('Lỗi!')
      }
    })
  }
  const handleStatusChange = (newStatus: any, id: string) => {
    updateMutation.mutate(
      { id: id, status: newStatus },
      {
        onSuccess: () => {
          toast.success('Đã cập nhật trạng thái nhân viên.')
          queryClient.invalidateQueries({ queryKey: ['user', 3] })
        },
        onError: () => {
          toast.warn('Lỗi server!')
        }
      }
    )
  }

  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = async () => {
    try {
      if (searchQuery) {
        const response = await getAllStaff({ username: searchQuery })
        setStaff(response.data.user)
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error)
    }
  }

  const { isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', 4],
    queryFn: () => {
      return getAllStaff({ username: searchQuery })
    },
    onSuccess: (data) => {
      setStaff(data.data.user)
      // setCount(data.data)
    },
    cacheTime: 30000
  })
  return (
    <>
      <div className='bg-[#f3f3f4] min-h-screen flex-1 transition-all  dark:bg-[#1d1d27] h-screen'>
        <div className='px-5 pt-5 mb-8 sm:flex sm:justify-between'>
          <h1 className='text-2xl mb-6 sm:mb-0 font-semibold dark:text-white'>Danh sách nhân viên</h1>
          <div className='w-full flex sm:w-auto'>
            <input
              className='px-[14px] flex-1 py-2 dark:placeholder:text-gray-300 border dark:border-gray-500 dark:border-r-0 bg-white dark:bg-[#1d1d27]'
              type='text'
              name=''
              id=''
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                handleSearch()
              }}
              placeholder='Nhập username'
            />
            <button
              onClick={handleSearch}
              className='text-white px-[14px] py-2 bg-[#44f] transition-all hover:bg-[#3333bf]'
            >
              Tìm kiếm
            </button>
            <button
              onClick={() => setShowCreate(true)}
              className='text-white transition-all hover:bg-[#058f7c] px-[14px] py-2 bg-[#07bfa5]'
            >
              Thêm mới
            </button>
          </div>
        </div>
        <div className='px-5  mx-auto '>
          <div className='p-4 text-[15px] dark:border-t-white dark:border-gray-500 dark:bg-[#2c2c39]  dark:text-white border-x md:justify-start bg-white border-b gap-x-[4px] h-max  flex justify-center items-center'>
            <span>Show</span>
            <select className='w-[78px] border dark:border-gray-500 py-1 pl-2 bg-white dark:bg-[#2c2c39]' name='' id=''>
              <option value=''>10</option>
              <option value=''>25</option>
              <option value=''>50</option>
              <option value=''>100</option>
            </select>
            <span>entries</span>
          </div>
          <>
            {isLoadingUser ? (
              <div style={{ zIndex: 10000 }} className='fixed top-0 left-0 w-full h-full  bg-[rgba(0,0,0,0.2)]'>
                <div className='w-full flex justify-center items-center h-full gap-x-3'>
                  <svg
                    aria-hidden='true'
                    className='inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                  <span className='text-lg dark:text-white'>Đang tải...</span>
                </div>
              </div>
            ) : (
              <div className='relative border-x dark:border-x-gray-600 flex-1 overflow-x-auto '>
                <table className='w-full z-0 text-sm text-left text-gray-500 :text-gray-400'>
                  <thead className='dark:bg-[#2c2c39]  dark:border-gray-600 dark:text-gray-300 text-[13px] text-gray-700 uppercase bg-white border-b  hh:bg-gray-700 hh:text-gray-400'>
                    <tr>
                      <th
                        scope='col'
                        className='px-3 cursor-pointer py-4 flex items-center gap-x-4 text-[#9d9da7] dark:text-gray-300 font-semibold'
                      >
                        STT{' '}
                        <div className=''>
                          <svg
                            className='w-4 h-4 rotate-45 translate-y-[6px]'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <g clip-path='url(#clip0_429_11159)'>
                              <path
                                d='M16 8H8V16'
                                stroke='#9d9da7'
                                stroke-width='2.5'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_429_11159'>
                                <rect width='24' height='24' fill='white' />
                              </clipPath>
                            </defs>
                          </svg>
                          <svg
                            className='w-4 h-4 -rotate-[135deg] -translate-y-[6px]'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <g clip-path='url(#clip0_429_11159)'>
                              <path
                                d='M16 8H8V16'
                                stroke='#9d9da7'
                                stroke-width='2.5'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_429_11159'>
                                <rect width='24' height='24' fill='white' />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </th>
                      <th scope='col' className='px-6 py-4 text-[#9d9da7] dark:text-gray-300 font-semibold'>
                        Username
                      </th>
                      <th scope='col' className='px-6 py-4 text-[#9d9da7] dark:text-gray-300 font-semibold'>
                        Password
                      </th>
                      <th scope='col' className='px-6 py-4 text-[#9d9da7] dark:text-gray-300 font-semibold'>
                        Họ tên
                      </th>
                      <th scope='col' className='px-6 py-4 text-[#9d9da7] dark:text-gray-300 font-semibold'>
                        Điện thoại
                      </th>
                      <th scope='col' className='px-6 py-4 text-[#9d9da7] dark:text-gray-300 font-semibold'>
                        Email
                      </th>
                      <th scope='col' className='px-6 py-4 text-[#9d9da7] dark:text-gray-300 font-semibold'>
                        Status
                      </th>
                      <th scope='col' className='px-6 py-4 text-[#9d9da7] dark:text-gray-300 font-semibold'>
                        Active
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className=' dark:text-white even:bg-white odd:bg-gray-100 dark:odd:bg-[#1d1d27] dark:even:bg-[#2c2c39] border-b hh:bg-gray-900 dark:border-gray-600'
                      >
                        <th
                          scope='row'
                          className='dark:text-white px-6 py-4 font-medium text-gray-900 whitespace-nowrap hh:text-white'
                        >
                          {index + 1}
                        </th>
                        <td className='px-6 py-4'>{item.username}</td>
                        <td className='px-6 py-4 text-[#44f] dark:text-blue-200 text-lg'>
                          <button
                            onClick={() => {
                              setShowChangePassword(true)
                              setUserTemp(item)
                            }}
                          >
                            ******
                          </button>
                        </td>
                        <td className='px-6 py-4'>{item.name}</td>
                        <td className='px-6 py-4'>{item.phone}</td>
                        <td className='px-6 py-4'>{item.email}</td>
                        <td className='px-6 py-4'>
                          {/* <button
                            onClick={() => handleStatusChange(item)}
                            className={`text-white text-xs hover:text-[#44f] dark:hover:text-gray-600 transition-all bg-[#07bfa5] rounded-full px-2 py-[2px] ${
                              item.status ? 'bg-red-500' : 'bg-green-500'
                            }`}
                          >
                            {item.status ? 'Đóng' : 'Mở'}
                          </button> */}
                          <select
                            title='Thao tác'
                            value={item.status}
                            onChange={(e) => handleStatusChange(e.target.value, item._id)}
                            className={`text-white cursor-pointer ${
                              item.status
                                ? 'bg-green-700 hover:bg-green-800 focus:ring-green-300'
                                : 'bg-red-700 hover:bg-red-800 focus:ring-red-300'
                            } focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-2 py-1 text-center dark:focus:ring-blue-900 dark:bg-blue-600 dark:hover-bg-blue-700`}
                          >
                            <option className='cursor-pointer hover:cursor-pointer bg-green-800' value='true'>
                              Mở
                            </option>
                            <option className='cursor-pointer hover:cursor-pointer bg-red-700' value='false'>
                              Khoá
                            </option>
                          </select>
                        </td>

                        <td className='px-6 py-4'>
                          <div className='flex gap-x-1'>
                            <button
                              onClick={() => {
                                setShowUpdate(true)
                                setUserTemp(item)
                              }}
                              className='py-2 px-[14px] dark:bg-[#626273] dark:text-white dark:hover:bg-[#4a4a56] bg-[#d2d2d5] text-black hover:bg-opacity-70 transition-all'
                            >
                              Sửa
                            </button>
                            <button
                              onClick={() => handledeleteStaff(item._id)}
                              className='py-2 px-[14px] bg-[#ff5272] hover:bg-[#ce435d] transition-all text-white'
                            >
                              Xoá
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
          <div className='bg-white dark:bg-[#2c2c39] dark:text-white dark:border-x dark:border-x-gray-600 dark:border-b dark:border-b-gray-600 flex flex-col md:flex-row items-center py-2 px-5 justify-between'>
            <span className='mt-2 mb-5'>Showing 1 to 7 of 7 entries</span>
            <div className='flex'>
              <div className='dark:bg-gray-50 dark:text-gray-400 flex items-center justify-center text-gray-600 border w-[83px] h-[36px]'>
                Previous
              </div>
              <div className=' flex items-center justify-center border px-3 border-[#44f] bg-[#44f] text-white h-[36px]'>
                1
              </div>
              <div className='dark:bg-gray-50 dark:text-gray-400 flex items-center justify-center text-gray-600 border w-[83px] h-[36px]'>
                Previous
              </div>
            </div>
          </div>
        </div>

        <div className='text-gray-600 text-[12px] py-6 flex justify-end pr-4 dark:text-white'>© 2023. Copyright</div>
        <CreateUserModal
          isOpen={showCreate}
          onClose={() => setShowCreate(false)}
          staffData={staff}
          setStaffData={setStaff}
        ></CreateUserModal>
        <UpdateUserModal data={userTemp} isOpen={showUpdate} onClose={() => setShowUpdate(false)}></UpdateUserModal>
        <ChangePasswordModal data={userTemp} isOpen={showChangePassword} onClose={() => setShowChangePassword(false)} />
      </div>
    </>
  )
}

export default AdminUser
