/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'

const NavbarAdmin = ({ showNavDesktop }: any) => {
  const location = useLocation()
  const { profile } = useContext(AppContext)

  return (
    <nav
      style={{ zIndex: 34 }}
      className={`lg:flex fixed dark:bg-[#1d1d27] bg-white h-full z-30 group hover:w-[260px] flex-col transition-all duration-500 gap-y-7 hidden ${
        showNavDesktop ? 'w-[260px]' : 'w-[67px]'
      }  border-r dark:border-r-gray-600 min-h-screen`}
    >
      <div className='flex items-center justify-start ml-4 my-4'>
        <div className={`  w-9 h-9  rounded-full bg-[#4444ff] flex items-center justify-center`}>
          <svg className='w-4 h-4' viewBox='0 0 11 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect x='0.399994' width='4' height='12' fill='white'></rect>
            <path
              d='M5.89998 9.6C7.1465 9.6 8.34196 9.09429 9.22338 8.19411C10.1048 7.29394 10.6 6.07304 10.6 4.8C10.6 3.52696 10.1048 2.30606 9.22338 1.40589C8.34196 0.505713 7.1465 2.4787e-07 5.89998 0L5.89998 4.8L5.89998 9.6Z'
              fill='white'
            ></path>
          </svg>
        </div>
        <p
          className={`ml-2 group-hover:opacity-100 dark:text-white group-hover:visible group-hover:w-10 font-bold uppercase duration-300 transition-all text-[21.2px] ${
            showNavDesktop ? 'opacity-100 visible w-10' : 'opacity-0 invisible w-0'
          }`}
        >
          Panel
        </p>
      </div>
      <div className={`flex flex-col transition-all duration-500 ${showNavDesktop ? 'pr-2' : ''}`}>
        <Link
          // onClick={() => setShowNav(false)}
          to={'/admin/index'}
          className={`flex  ${
            location?.pathname === '/admin/index' && 'bg-[#44f]'
          }  h-[48px] transition-all duration-300 group-hover:px-[16px] group-hover:py-[6px] group-hover:rounded-r-full ${
            showNavDesktop ? 'px-[16px] py-[6px] rounded-r-full' : 'items-center pl-[16px] rounded-r-none'
          } gap-x-4 items-center`}
        >
          <svg
            fill={`${location?.pathname === '/admin/index' ? 'white' : '#626273 '}`}
            className='w-8 h-4'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v3.585a.746.746 0 010 .83v8.085A1.75 1.75 0 0114.25 16H6.309a.748.748 0 01-1.118 0H1.75A1.75 1.75 0 010 14.25V6.165a.746.746 0 010-.83V1.75zM1.5 6.5v7.75c0 .138.112.25.25.25H5v-8H1.5zM5 5H1.5V1.75a.25.25 0 01.25-.25H5V5zm1.5 1.5v8h7.75a.25.25 0 00.25-.25V6.5h-8zm8-1.5h-8V1.5h7.75a.25.25 0 01.25.25V5z'
            ></path>
          </svg>
          <p
            className={`transition-all duration-500 group-hover:opacity-100 group-hover:visible group-hover:w-[100px]  ${
              showNavDesktop ? 'opacity-100 visible w-[100px]' : 'w-0 opacity-0 invisible'
            } ${location?.pathname === '/admin/index' ? 'text-white' : 'text-[rgba(58,58,73,.75)] dark:text-gray-400'}`}
          >
            Table
          </p>
        </Link>
        {profile?.isAdmin && (
          <Link
            // onClick={() => setShowNav(false)}
            to={'/admin/user'}
            className={`flex  ${
              location?.pathname === '/admin/user' && 'bg-[#44f]'
            }  h-[48px] transition-all duration-300 group-hover:px-[16px] group-hover:py-[6px] group-hover:rounded-r-full  ${
              showNavDesktop ? 'px-[16px] py-[6px] rounded-r-full' : 'items-center pl-[16px] rounded-r-none'
            } gap-x-4 items-center`}
          >
            <svg
              fill={`${location?.pathname === '/admin/user' ? 'white' : '#626273 '}`}
              className='w-8 h-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v3.585a.746.746 0 010 .83v8.085A1.75 1.75 0 0114.25 16H6.309a.748.748 0 01-1.118 0H1.75A1.75 1.75 0 010 14.25V6.165a.746.746 0 010-.83V1.75zM1.5 6.5v7.75c0 .138.112.25.25.25H5v-8H1.5zM5 5H1.5V1.75a.25.25 0 01.25-.25H5V5zm1.5 1.5v8h7.75a.25.25 0 00.25-.25V6.5h-8zm8-1.5h-8V1.5h7.75a.25.25 0 01.25.25V5z'
              ></path>
            </svg>
            <p
              className={`transition-all duration-500 group-hover:opacity-100 group-hover:visible group-hover:w-[100px] ${
                showNavDesktop ? 'opacity-100 visible w-[100px]' : 'w-0 opacity-0 invisible'
              } ${
                location?.pathname === '/admin/user' ? 'text-white' : 'dark:text-gray-400  text-[rgba(58,58,73,.75)] '
              }`}
            >
              User
            </p>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default NavbarAdmin
