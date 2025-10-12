import { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import HeaderAdmin from '~/components/HeaderAdmin'
import NavbarAdmin from '~/components/NavbarAdmin'
import { AppContext } from '~/contexts/app.context'
interface Props {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
  const [showNav, setShowNav] = useState(false)
  const [showNavDesktop, setShowNavDesktop] = useState(false)
  const location = useLocation()
  const { profile } = useContext(AppContext)

  return (
    <div className='flex'>
      <div
        onClick={() => setShowNav(false)}
        className={` bg-[rgba(31,31,78,0.44)] lg:hidden z-10 fixed top-0 left-0 w-full transition-all h-full ${
          showNav ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      ></div>
      <div
        style={{ zIndex: 100 }}
        className={`z-100 lg:hidden dark:bg-[#1d1d27] fixed h-full w-[260px] bg-white top-0 transition-all duration-300 ${
          showNav ? 'left-0' : 'left-[-100%]'
        }`}
      >
        <div className='p-4 flex items-center'>
          <div className='  w-9 h-9 mr-3 rounded-full bg-[#4444ff] flex items-center justify-center'>
            <svg className='w-4 h-4' viewBox='0 0 11 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <rect x='0.399994' width='4' height='12' fill='white'></rect>
              <path
                d='M5.89998 9.6C7.1465 9.6 8.34196 9.09429 9.22338 8.19411C10.1048 7.29394 10.6 6.07304 10.6 4.8C10.6 3.52696 10.1048 2.30606 9.22338 1.40589C8.34196 0.505713 7.1465 2.4787e-07 5.89998 0L5.89998 4.8L5.89998 9.6Z'
                fill='white'
              ></path>
            </svg>
          </div>
          <p className='font-bold uppercase text-[21.2px] dark:text-white'>Panel</p>
        </div>
        <div className='pt-5 pr-3'>
          <Link
            onClick={() => setShowNav(false)}
            to={'/admin/index'}
            className={`flex  ${
              location?.pathname === '/admin/index' && 'bg-[#44f] dark:bg-[#454555]'
            } rounded-r-full h-[48px] px-[16px] py-[6px] gap-x-4 items-center`}
          >
            <svg
              fill={`${location?.pathname === '/admin/index' ? 'white' : '#626273  '}`}
              className='w-4 h-4 dark:fill-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v3.585a.746.746 0 010 .83v8.085A1.75 1.75 0 0114.25 16H6.309a.748.748 0 01-1.118 0H1.75A1.75 1.75 0 010 14.25V6.165a.746.746 0 010-.83V1.75zM1.5 6.5v7.75c0 .138.112.25.25.25H5v-8H1.5zM5 5H1.5V1.75a.25.25 0 01.25-.25H5V5zm1.5 1.5v8h7.75a.25.25 0 00.25-.25V6.5h-8zm8-1.5h-8V1.5h7.75a.25.25 0 01.25.25V5z'
              ></path>
            </svg>
            <p
              className={` ${
                location?.pathname === '/admin/index' ? 'text-white' : 'text-[rgba(58,58,73,.75)] dark:text-gray-400'
              }`}
            >
              Table
            </p>
          </Link>
          {profile?.isAdmin && (
            <Link
              onClick={() => setShowNav(false)}
              to={'/admin/user'}
              className={`flex  ${
                location?.pathname === '/admin/user' && 'bg-[#44f] dark:bg-[#454555]'
              } rounded-r-full h-[48px] px-[16px] py-[6px] gap-x-4 items-center`}
            >
              <svg
                fill={`${location?.pathname === '/admin/user' ? 'white' : '#626273  '}`}
                className='w-4 h-4 dark:fill-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v3.585a.746.746 0 010 .83v8.085A1.75 1.75 0 0114.25 16H6.309a.748.748 0 01-1.118 0H1.75A1.75 1.75 0 010 14.25V6.165a.746.746 0 010-.83V1.75zM1.5 6.5v7.75c0 .138.112.25.25.25H5v-8H1.5zM5 5H1.5V1.75a.25.25 0 01.25-.25H5V5zm1.5 1.5v8h7.75a.25.25 0 00.25-.25V6.5h-8zm8-1.5h-8V1.5h7.75a.25.25 0 01.25.25V5z'
                ></path>
              </svg>
              <p
                className={` ${
                  location?.pathname === '/admin/user' ? 'text-white' : 'text-[rgba(58,58,73,.75)] dark:text-gray-400'
                }`}
              >
                Người dùng
              </p>
            </Link>
          )}
        </div>
      </div>
      <NavbarAdmin showNavDesktop={showNavDesktop}></NavbarAdmin>
      <div
        className={`${
          showNavDesktop ? 'lg:pl-[260px]' : 'lg:pl-[67px]'
        } flex-1 transition-all duration-500 flex flex-col`}
      >
        <HeaderAdmin
          setShowNav={setShowNav}
          showNavDesktop={showNavDesktop}
          setShowNavDesktop={setShowNavDesktop}
        ></HeaderAdmin>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
