/* eslint-disable @typescript-eslint/no-explicit-any */
import Meta from '~/assets/images/meta.jpg'
import Camera from '~/assets/images/camera.png'
import Check from '~/assets/images/check.png'
import Lib from '~/assets/images/lib.png'
import Mic from '~/assets/images/mic.png'
import Like from '~/assets/images/like.png'
import Face from '~/assets/images/face.png'
import Down from '~/assets/images/down-chevron-svgrepo-com.svg'
import { FormEvent, useState } from 'react'
import { getChatFromLS, getFakeChatFromLS, setChatToLS, setFakeChatToLS } from '~/utils/auth'

const Success = () => {
  const [isSendStart, setSendStart] = useState(false)
  const [isBotStart, setBotStart] = useState(false)
  const [isHidden, setHidden] = useState(false)
  const [dataMess, setDataMess] = useState<any>(getChatFromLS() || [])
  const [value, setValue] = useState('')
  const handSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newData = [...dataMess, value]
    setDataMess(newData)
    setChatToLS(newData)
    setValue('')
  }
  const handleSendBase = () => {
    setSendStart(true)
    setFakeChatToLS()
    setTimeout(() => {
      setBotStart(true)
    }, 4000)
  }
  return (
    <div className='flex flex-col h-screen'>

      <div className='flex-1 bg-[#e3e7ea]'>
        <div className='bg-white pb-6 px-2 h-full w-full sm:w-[450px] mx-auto border'>
          <div className='flex h-[7%] items-center gap-x-2 pt-2'>
            <button className='flex items-center'>
              <div className='text-purple-500 w-[20px] h-[20px]'>
                <img className='rotate-90' src={Down} alt='' />
              </div>
              <div className=' rounded-xl bg-purple-500 px-1  text-white text-[13px] py-0.5 pb-1 flex items-center'>
                10
              </div>
            </button>
            <div className='h-[30px]'>
              <img src={Meta} alt='' />
            </div>
            <div>
              <div className='flex font-bold h-[17px] items-center gap-x-1'>
                Meta Business Support{' '}
                <span className='w-[12px] h-[12px]'>
                  <img src={Check} alt='' />
                </span>
              </div>
              <div className='text-xs text-gray-400'>Đoạn chat kinh doanh</div>
            </div>
          </div>
          <div className=' h-[87%] flex flex-col '>
            <div className='mt-4'>
              <div className='h-[60px] w-[60px] relative mx-auto'>
                <img src={Meta} alt='' />
                <span className='absolute -bottom-2 -right-3 text-xs font-semibold bg-gray-100 px-1 rounded-xl text-green-400'>
                  7 phút
                </span>
              </div>
              <h2 className='text-2xl font-bold text-center mt-3'>Meta Business Support</h2>
              <p className='text-sm font-semibold w-[80%] mx-auto text-center'>
                427K người thích Trang này, bao gồm Nguyễn Hữu Quốc và 4 người bạn
              </p>
              <p className='text-sm text-center mt-1'>Công ty cung cấp Internet</p>
            </div>
            {!getFakeChatFromLS() && (
              <>
                {isSendStart ? (
                  <div className=' pt-3 mt-3'>
                    <div className='text-white mb-3 ml-auto max-w-[80%] bg-blue-500 w-max px-2.5 pb-1.5 text-sm py-1 rounded-2xl'>
                      Gửi thông tin mới cho tôi
                    </div>
                    {isBotStart && (
                      <>
                        <div className='text-xs text-gray-500 mx-2 text-center mb-3'>
                          Meta Business Support muốn gửi thông tin mới cho bạn. Đó có thể là nội dung quảng cáo.
                        </div>
                        <div className='flex items-end gap-x-2 mb-3'>
                          <div className='w-4 h-4 mb-[2px]'>
                            <img src={Meta} alt='' />
                          </div>
                          <div className='text-gray-500 max-w-[70%] bg-gray-100 w-max px-2.5 pb-1.5 text-sm py-1 rounded-2xl'>
                            <h4 className='font-bold text-black'>advertiser_guidance</h4>
                            <p>
                              Bạn muốn nhận thêm tin nhắn từ chúng tôi ư? Bất cứ lúc nào bạn cũng có thể chọn không nhận
                              nữa.
                            </p>
                            {!isHidden && (
                              <div
                                onClick={() => setHidden(true)}
                                className='font-bold text-black w-full bg-white text-center py-1.5 pb-2 cursor-pointer rounded-xl my-1'
                              >
                                {' '}
                                Nhận thông tin mới
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className='mt-auto my-8'>
                    <div
                      onClick={handleSendBase}
                      className='text-blue-400 white hover:shadow-none transition-all hover:bg-gray-100 mx-auto w-max mb-2 shadow rounded-full py-2 px-2 cursor-pointer'
                    >
                      Gửi thông tin mới cho tôi.
                    </div>
                    <p className='text-[13px] leading-4 text-center mx-auto w-[90%] text-gray-400'>
                      Bạn đã bắt đầu đoạn chat với Meta Business Support.
                    </p>
                    <p className='text-[13px] leading-4 text-center mx-auto w-[90%] text-gray-400'>
                      Chúng tôi dùng thông tin từ đoạn chat này để cải thiện trải nghiệm của bạn{' '}
                      <strong className='text-black'>Tìm hiểu về đoạn chat kinh doanh và quyền riêng tư của bạn</strong>
                    </p>
                  </div>
                )}
              </>
            )}

            {dataMess?.map((item: string, index: number) => (
              <div
                key={index}
                className='text-white mb-3 ml-auto max-w-[80%] bg-blue-500 w-max px-2.5 pb-1.5 text-sm py-1 rounded-2xl'
              >
                {item}
              </div>
            ))}
          </div>
          <div className='flex h-[6%] justify-between'>
            <div className='flex items-center gap-x-3'>
              <div className='cursor-pointer h-[21px]'>
                <img src={Camera} alt='' />
              </div>
              <div className='cursor-pointer h-[21px]'>
                <img src={Lib} alt='' />
              </div>
              <div className='cursor-pointer h-[21px]'>
                <img src={Mic} alt='' />
              </div>
            </div>
            <form onSubmit={handSubmit} className='flex-1 relative py-1.5 flex items-center pl-4'>
              <input
                placeholder='Aa'
                className='pb-0.5 bg-gray-100 w-full pl-2 h-full rounded-full '
                type='text'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button type='submit'></button>
              <div className='absolute right-2 top-1/2 -translate-y-1/2 w-[21px] h-[21px] cursor-pointer'>
                <img src={Face} alt='' />
              </div>
            </form>
            <div className='cursor-pointer p-2'>
              <img src={Like} alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success
