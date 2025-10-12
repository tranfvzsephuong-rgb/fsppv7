/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import Avatar from '~/assets/images/01.jpg'
import Avatar6 from '~/assets/images/06 (1).jpg'
import Avatar7 from '~/assets/images/clock.jpg'
import Avatar8 from '~/assets/images/phantram.jpg'
import { AppContext } from '~/contexts/app.context'
import useDarkMode from '~/hooks/useDarkMode'
const HeaderAdmin = ({ setShowNav, setShowNavDesktop, showNavDesktop }: any) => {
  const [isDarkMode, toggleDarkMode] = useDarkMode()
  console.log(isDarkMode)
  const [showSearch, setShowSearch] = useState(false)
  const [showLang, setShowLang] = useState(false)
  const [showNoti, setShowNoti] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const { profile, reset } = useContext(AppContext)
  return (
    <div className='h-[70px] dark:bg-[#282832] transition-all duration-500 dark:border-b-gray-600 z-100 border-b flex px-5 items-center relative justify-between'>
      <div className='flex gap-x-4 items-center'>
        <div className=' lg:hidden  w-10 h-10 mr-3 rounded-full bg-[#4444ff] flex items-center justify-center'>
          <svg className='w-4 h-4' viewBox='0 0 11 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect x='0.399994' width='4' height='12' fill='white'></rect>
            <path
              d='M5.89998 9.6C7.1465 9.6 8.34196 9.09429 9.22338 8.19411C10.1048 7.29394 10.6 6.07304 10.6 4.8C10.6 3.52696 10.1048 2.30606 9.22338 1.40589C8.34196 0.505713 7.1465 2.4787e-07 5.89998 0L5.89998 4.8L5.89998 9.6Z'
              fill='white'
            ></path>
          </svg>
        </div>
        <button
          style={{ zIndex: 33 }}
          onClick={() => {
            setShowNavDesktop(!showNavDesktop)
            setShowModal(false)
            setShowSearch(false)
            setShowLang(false)
            setShowNoti(false)
            setShowProfile(false)
          }}
          className={`hidden ${showNavDesktop ? 'rotate-180' : ''} w-7 h-7 lg:flex items-center justify-center group`}
        >
          <svg
            className='w-4 h-4 dark:fill-gray-300 group-hover:fill-[#44f] dark:group-hover:fill-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='#626273'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z'
            ></path>
          </svg>
        </button>
        <button
          style={{ zIndex: 33 }}
          onClick={() => {
            setShowModal(true)
            setShowSearch(!showSearch)
            setShowLang(false)
            setShowNoti(false)
            setShowProfile(false)
          }}
          className='w-7 h-7 flex items-center  justify-center group'
        >
          <svg
            className='w-4 h-4 dark:fill-gray-300 group-hover:fill-[#44f] dark:group-hover:fill-white'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='#626273'
          >
            <path
              fillRule='evenodd'
              d='M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z'
            ></path>
          </svg>
        </button>
        <button
          style={{ zIndex: 33 }}
          onClick={() => {
            setShowLang(!showLang)
            setShowModal(true)
            setShowSearch(false)
            setShowNoti(false)
            setShowProfile(false)
          }}
          className='w-7 h-7 dark:text-gray-300 flex items-center justify-center group'
        >
          <p className='group-hover:text-[#44f] dark:group-hover:text-white'>Eng</p>
        </button>
      </div>
      <div className='flex gap-x-3  items-center'>
        <button onClick={toggleDarkMode} className='w-7 h-7 flex items-center justify-center group'>
          <svg
            className='w-4 h-4 dark:fill-gray-300 group-hover:fill-[#44f] dark:group-hover:fill-white'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='#626273'
          >
            <path
              className=' group-hover:fill-[#44f] dark:group-hover:fill-white'
              fillRule='evenodd'
              d='M9.598 1.591a.75.75 0 01.785-.175 7 7 0 11-8.967 8.967.75.75 0 01.961-.96 5.5 5.5 0 007.046-7.046.75.75 0 01.175-.786zm1.616 1.945a7 7 0 01-7.678 7.678 5.5 5.5 0 107.678-7.678z'
            />
          </svg>
        </button>
        <button className='relative w-7 h-7 flex items-center justify-center group'>
          <svg
            className='w-4 h-4 dark:fill-gray-300 group-hover:fill-[#44f] dark:group-hover:fill-white '
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='#626273'
          >
            <g fillRule='evenodd'>
              <path d='M3.25 9a.75.75 0 01.75.75c0 2.142.456 3.828.733 4.653a.121.121 0 00.05.064.207.207 0 00.117.033h1.31c.085 0 .18-.042.258-.152a.448.448 0 00.075-.366A16.74 16.74 0 016 9.75a.75.75 0 011.5 0c0 1.588.25 2.926.494 3.85.293 1.113-.504 2.4-1.783 2.4H4.9c-.686 0-1.35-.41-1.589-1.12A16.42 16.42 0 012.5 9.75.75.75 0 013.25 9z'></path>
              <path d='M0 6a4 4 0 014-4h2.75a.75.75 0 01.75.75v6.5a.75.75 0 01-.75.75H4a4 4 0 01-4-4zm4-2.5a2.5 2.5 0 000 5h2v-5H4z'></path>
              <path d='M15.59.082A.75.75 0 0116 .75v10.5a.75.75 0 01-1.189.608l-.002-.001h.001l-.014-.01a5.829 5.829 0 00-.422-.25 10.58 10.58 0 00-1.469-.64C11.576 10.484 9.536 10 6.75 10a.75.75 0 110-1.5c2.964 0 5.174.516 6.658 1.043.423.151.787.302 1.092.443V2.014c-.305.14-.669.292-1.092.443C11.924 2.984 9.713 3.5 6.75 3.5a.75.75 0 110-1.5c2.786 0 4.826-.484 6.155-.957.665-.236 1.154-.47 1.47-.64a5.82 5.82 0 00.421-.25l.014-.01a.75.75 0 01.78-.061zm-.78.06zm.44 11.108l-.44.607.44-.607z'></path>
            </g>
          </svg>
          <div className='absolute animate-ping duration-100 w-[5px] h-[5px] top-[2px] right-[2px] rounded-full bg-green-500'></div>
        </button>
        <button
          style={{ zIndex: 33 }}
          onClick={() => {
            setShowNoti(!showNoti)
            setShowModal(true)
            setShowProfile(false)
            setShowLang(false)
            setShowSearch(false)
          }}
          className='w-7 h-7 relative flex items-center justify-center group'
        >
          <svg
            className='w-4 h-4 dark:fill-gray-300 group-hover:fill-[#44f] dark:group-hover:fill-white '
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='#626273'
          >
            <path
              fillRule='evenodd'
              d='M8 1.5c-.997 0-1.895.416-2.534 1.086A.75.75 0 014.38 1.55 5 5 0 0113 5v2.373a.75.75 0 01-1.5 0V5A3.5 3.5 0 008 1.5zM4.182 4.31L1.19 2.143a.75.75 0 10-.88 1.214L3 5.305v2.642a.25.25 0 01-.042.139L1.255 10.64A1.518 1.518 0 002.518 13h11.108l1.184.857a.75.75 0 10.88-1.214l-1.375-.996a1.196 1.196 0 00-.013-.01L4.198 4.321a.733.733 0 00-.016-.011zm7.373 7.19L4.5 6.391v1.556c0 .346-.102.683-.294.97l-1.703 2.556a.018.018 0 00-.003.01.015.015 0 00.005.012.017.017 0 00.006.004l.007.001h9.037zM8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16z'
            ></path>
          </svg>
          <div className='absolute w-[6px] rounded-full h-[6px] bg-red-400 top-[2px] right-[2px]'></div>
        </button>
        <button
          style={{ zIndex: 33 }}
          onClick={() => {
            setShowProfile(!showProfile)
            setShowNoti(false)
            setShowModal(true)
            setShowLang(false)
            setShowSearch(false)
          }}
        >
          <div className='w-8 h-8  mr-2 relative'>
            <img className='w-full h-full rounded-full' src={Avatar} alt='Avatar' />
            <div className='absolute bg-white rounded-full w-2 h-2 bottom-0 right-0 flex items-center justify-center'>
              <div className='w-[5px] h-[5px] bg-green-500 rounded-full'></div>
            </div>
          </div>
        </button>
        <button onClick={() => setShowNav(true)} className='lg:hidden w-7 h-7 flex items-center justify-center group'>
          <svg
            className='w-4 h-4 group-hover:fill-[#44f] dark:group-hover:fill-white'
            fill='#626273'
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            viewBox='0 0 26 26'
          >
            <path d='M 0 4 L 0 6 L 26 6 L 26 4 Z M 0 12 L 0 14 L 26 14 L 26 12 Z M 0 20 L 0 22 L 26 22 L 26 20 Z' />
          </svg>
        </button>
      </div>
      <div
        style={{ zIndex: 32 }}
        onClick={() => {
          setShowModal(false)
          setShowLang(false)
          setShowNoti(false)
          setShowProfile(false)
          setShowSearch(false)
        }}
        className={` bg-transparent fixed top-0 left-0 w-full transition-all h-full ${showModal ? 'visible opacity-100' : 'invisible opacity-0'
          }  
          }`}
      ></div>
      {showSearch && (
        <div
          style={{ zIndex: 32 }}
          className='absolute dark:bg-[#3a3a49] bg-white z-100 dark:border shadow-md border-t dark:border-gray-600 w-[93%] lg:w-[378px] lg:left-[60px] lg:-translate-x-0 top-full left-1/2 -translate-x-1/2'
        >
          <div className='flex items-center gap-x-2  px-5 border-b dark:border-gray-600'>
            <div>
              <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' viewBox='0 0 16 16' fill='#9d9da7'>
                <path
                  fillRule='evenodd'
                  d='M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z'
                ></path>
              </svg>
            </div>
            <input
              className='py-4 pb-5 flex-1 placeholder:text-[#9d9da7] placeholder:text-[14px] '
              type='text'
              name=''
              id=''
              placeholder='Search everything...'
            />
          </div>
          <div className='p-4'>
            <div className='text-[13.125px] font-semibold dark:text-gray-400'>Top searches</div>
          </div>
          <div className='flex flex-wrap gap-2 px-4 pb-4'>
            <div className='bg-[#f3f3f4] py-2 px-4 border  text-[11.4px]'>Campaign reports</div>
            <div className='bg-[#f3f3f4] py-2 px-4 border  text-[11.4px]'>Project #4535</div>
            <div className='bg-[#f3f3f4] py-2 px-4 border  text-[11.4px]'>Chat</div>
            <div className='bg-[#f3f3f4] py-2 px-4 border  text-[11.4px]'>Tasks</div>
            <div className='bg-[#f3f3f4] py-2 px-4 border  text-[11.4px]'>Affiliates</div>
            <div className='bg-[#f3f3f4] py-2 px-4 border  text-[11.4px]'>Faqs</div>
            <div className='bg-[#f3f3f4] py-2 px-4 border  text-[11.4px]'>Inbox</div>
          </div>
        </div>
      )}
      {showLang && (
        <div
          style={{ zIndex: 32 }}
          className='absolute dark:bg-[#3a3a49] bg-white dark:border dark:border-gray-600 z-100 p-3 shadow-md border-t w-[93%] lg:w-[192px] lg:left-[105px] lg:-translate-x-0 top-full left-1/2 -translate-x-1/2'
        >
          <ul className='w-full dark:text-white'>
            <li
              onClick={() => setShowLang(false)}
              className='w-full px-4 py-[9px] cursor-pointer text-[15px] dark:text-white dark:bg-[#1d1d27] bg-[#e7e7e9] text-[#4444ff]'
            >
              English
            </li>
            <li
              onClick={() => setShowLang(false)}
              className='w-full px-4 py-[9px] cursor-pointer dark:hover:text-white dark:hover:bg-[#454555] text-[15px] transition-all duration-500  dark:hover:bg-inherit hover:text-[#4444ff]'
            >
              Spanish
            </li>
            <li
              onClick={() => setShowLang(false)}
              className='w-full px-4 py-[9px] cursor-pointer dark:hover:text-white dark:hover:bg-[#454555] text-[15px] transition-all duration-500  dark:hover:bg-inherit hover:text-[#4444ff]'
            >
              French
            </li>
          </ul>
        </div>
      )}
      {showNoti && (
        <div
          style={{ zIndex: 32 }}
          className='absolute dark:bg-[#3a3a49] dark:border-gray-600 dark:text-white bg-white dark:border  z-100 shadow-md border-t w-[93%] lg:w-[378.4px] lg:right-[60px] lg:translate-x-0 top-full right-1/2 translate-x-1/2'
        >
          <div className='p-4 flex justify-between items-center border-b dark:border-gray-600 dark:text-white'>
            <h3 className='text-[17.5px]  font-semibold'>Notifications</h3>
            <button className='text-white py-2 hover:bg-[#3333bf] transition-colors duration-300 text-[13.2px] px-3 bg-[#4444ff]'>
              View All
            </button>
          </div>
          <div className='h-[260px] overflow-y-scroll '>
            <div>
              <div className='text-[#9d9da7] text-[13.125px] px-4 py-3 border-b dark:border-gray-600 dark:text-white'>
                New
              </div>
              <div className='px-5 py-3 border-b dark:border-gray-600 dark:text-white transition-all duration-300 cursor-pointer  dark:hover:bg-inherit'>
                <div className='flex gap-x-3 items-center justify-between'>
                  <div className='w-[48px] h-[48px] relative'>
                    <img className='rounded-full ' src={Avatar} alt='' />
                    <div className='absolute bg-white rounded-full w-3 h-3 bottom-0 right-0 flex items-center justify-center'>
                      <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-y-1 flex-1'>
                    <div className='text-[15px] text-[#3a3a49] dark:text-white leading-5'>
                      <strong className='font-semibold'>Adam Danely</strong> assigned a task to you{' '}
                      <strong className='font-semibold'>#PI-392</strong>
                    </div>
                    <div className='text-[#9d9da7] text-[13.125px] '>Just now</div>
                  </div>
                  <div className='ml-3 w-3 h-3 bg-[#44f] rounded-full'></div>
                </div>
              </div>
              <div className='px-5 py-3 border-b dark:border-gray-600 transition-all duration-300 cursor-pointer  dark:hover:bg-inherit'>
                <div className='flex gap-x-3 items-center justify-between'>
                  <div className='w-[48px] h-[48px] relative'>
                    <img className='rounded-full ' src={Avatar6} alt='Avatar6' />
                    <div className='absolute bg-white rounded-full w-3 h-3 bottom-0 right-0 flex items-center justify-center'>
                      <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-y-1 flex-1'>
                    <div className='text-[15px] text-[#3a3a49] dark:text-white leading-5'>
                      <strong className='font-semibold'>Vivianna Kiser</strong> just posted "Lorem ipsum is placeholder
                      text used in the graphic, print, and industries. "
                    </div>
                    <div className='text-[#9d9da7] text-[13.125px] '>Just now</div>
                  </div>
                  <div className='ml-3 w-3 h-3 bg-[#44f] rounded-full'></div>
                </div>
              </div>
            </div>
            <div>
              <div className='text-[#9d9da7] text-[13.125px] px-4 py-3 border-b dark:border-gray-600'>Earlier</div>
              <div className='px-5 py-3 border-b dark:border-gray-600 transition-all duration-300 cursor-pointer  dark:hover:bg-inherit'>
                <div className='flex gap-x-3 items-center justify-between'>
                  <div className='w-[50px] flex items-center justify-center bg-[#cdf2ed] h-[50px] rounded-full overflow-hidden'>
                    <img className='w-6 h-6' src={Avatar7} alt='Avatar7' />
                  </div>
                  <div className='flex flex-col gap-y-1 flex-1'>
                    <div className='text-[15px] text-[#3a3a49] dark:text-white leading-5'>
                      <strong className='font-semibold'>Updated</strong> Your account password updated succuessfully
                    </div>
                    <div className='text-[#9d9da7] text-[13.125px] '>2h Ago</div>
                  </div>
                </div>
              </div>
              <div className='px-5 py-3 border-b dark:border-gray-600 transition-all duration-300 cursor-pointer  dark:hover:bg-inherit'>
                <div className='flex gap-x-3 items-center justify-between'>
                  <div className='w-[50px] flex items-center justify-center bg-[#ffdce3] h-[50px] rounded-full overflow-hidden'>
                    <img className='w-6 h-6' src={Avatar8} alt='Avatar8' />
                  </div>
                  <div className='flex flex-col gap-y-1 flex-1'>
                    <div className='text-[15px] text-[#3a3a49] dark:text-white leading-5'>
                      <strong className='font-semibold'>Pro discount</strong> Upgrade to pro plan with 30% discount,
                      Apply coupon <button className='text-[11.25px] text-white bg-[#44f] px-[7.3px]'>PRO30</button>
                    </div>
                    <div className='text-[#9d9da7] text-[13.125px] '>2h Ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showProfile && (
        <div
          style={{ zIndex: 32 }}
          className='absolute bg-white dark:bg-[#3a3a49] dark:border-gray-600 dark:text-white z-100 shadow-md border-t w-[93%] lg:w-[190.4px] lg:right-[20px] lg:translate-x-0 top-full right-1/2 translate-x-1/2'
        >
          <div className='p-4 justify-between bg-[#21212bf1] items-center dark:border-b-0 border-b'>
            <h3 className='text-[17.5px]  font-semibold text-white leading-5'>{profile?.name}</h3>
            <p className='text-[rgba(255,255,255,.75)] text-[13.2px] mt-2'>
              {profile?.isAdmin && 'admin (Admin)'}
              {!profile?.isAdmin && (
                <span>
                  {profile?.name} {'(Staff)'}
                </span>
              )}
            </p>
          </div>
          <div className='p-2'>
            <ul className='border-b dark:border-gray-600 pb-4'>
              <li className='cursor-pointer hover:text-[#44f]  dark:hover:bg-[#454555] transition-all duration-300 px-4 py-[9px] text-[#3a3a49] dark:text-white text-[15px]'>
                Profile
              </li>
              <li className='cursor-pointer hover:text-[#44f]  dark:hover:bg-[#454555] transition-all duration-300 px-4 py-[9px] text-[#3a3a49] dark:text-white text-[15px]'>
                Settings
              </li>
              <li className='cursor-pointer hover:text-[#44f]  dark:hover:bg-[#454555] transition-all duration-300 px-4 py-[9px] text-[#3a3a49] dark:text-white text-[15px]'>
                Tasks
              </li>
            </ul>
            <div
              onClick={() => {
                reset()
              }}
              className='mt-1 w-full cursor-pointer hover:text-[#44f]  dark:hover:bg-inherit transition-all duration-300 px-4 py-[9px] text-[#3a3a49] dark:text-white text-[15px]'
            >
              Sign out
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeaderAdmin
