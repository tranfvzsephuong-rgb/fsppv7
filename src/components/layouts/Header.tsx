/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton } from '@material-tailwind/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// import Navbar from '~/modules/Navbar'
import logo from '~/assets/images/logo1s.jpg'
import logo_w from '~/assets/images/logo_w.png'
import {
  Bars3Icon,
  XMarkIcon
  //  GlobeAltIcon
} from '@heroicons/react/24/outline'
import {
  Navbar,
  Collapse,
  Typography,
  // IconButton,
  List,
  ListItem
  // Menu,
  // MenuHandler,
  // MenuList,
  // MenuItem
} from '@material-tailwind/react'
const Header = () => {
  function NavList() {
    return (
      <List className='mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1'>
        <Typography as='a' href='#' variant='small' color='blue-gray' className='font-medium'>
          <Link to='/dichvunhantien'>
            {' '}
            <ListItem className='flex items-center gap-2 p-2 m-2 text-2xl hover:underline underline-offset-[10px] decoration-[#FFDD00]'>
              Gửi tiền
            </ListItem>
          </Link>
        </Typography>

        <Typography as='a' href='#' variant='small' color='blue-gray' className='font-medium'>
          <Link to='/dichvunhantien'>
            {' '}
            <ListItem className='flex items-center gap-2 p-2 m-2 text-2xl hover:underline underline-offset-[10px] decoration-[#FFDD00]'>
              Nhận tiền nước ngoài
            </ListItem>
          </Link>
        </Typography>
        <Typography as='a' href='#' variant='small' color='blue-gray' className='font-medium'>
          <Link to='/dichvunhantien'>
            {' '}
            <ListItem className='flex items-center gap-2 p-2 m-2 text-2xl hover:underline underline-offset-[10px] decoration-[#FFDD00]'>
              Theo dõi chuyển tiền
            </ListItem>
          </Link>
        </Typography>
        <Typography as='a' href='#' variant='small' color='blue-gray' className='font-medium'>
          <Link to='/dichvunhantien'>
            {' '}
            <ListItem className='flex items-center gap-2 p-2 m-2 text-2xl hover:underline underline-offset-[10px] decoration-[#FFDD00]'>
              Tìm vị trí
            </ListItem>
          </Link>
        </Typography>
        <div>{/* <NavListMenu  /> */}</div>
        {/* <Typography
          as='a'
          href='#'
          variant='small'
          color='blue-gray'
          className='pl-3 font-medium flex items-center  gap-2'
        >
          <GlobeAltIcon strokeWidth={2.5} className={`text-[#FFDD00]  h-10 w-10 transition-transform lg:block `} />
        </Typography> */}
        {/* <form
          onSubmit={handleSubmitFormIssue}
          className='rounded-full cursor-pointer border-2 p-2 m-2 border-[#FFDD00] text-[#FFDD00]'
        >
          <button className='text-[#FFDD00] rounded-full cursor-pointer border-2 p-3 border-[#FFDD00]'>
            Đăng nhập
          </button>
        </form> */}
      </List>
    )
  }
  const [openNav, setOpenNav] = useState(false)
  return (
    <>
      <Navbar
        style={{ borderRadius: '0', top: 0, left: 0, right: 0, border: 'solid 0px' }}
        className='mx-auto max-w-full px-4 py-2 bg-black fixed z-50'
      >
        <div className='flex items-center md:justify-between text-blue-gray-900'>
          <Link to='/' className='hidden sm:flex items-center min-w-[240px]'>
            <img className='text-2xl w-20 font-semibold ml-10' src={logo} />
          </Link>
          <div className='hidden lg:block'>
            <NavList />
          </div>
          <IconButton variant='text' color='blue-gray' className='lg:hidden' onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <XMarkIcon className='h-6 w-6' strokeWidth={2} />
            ) : (
              <Bars3Icon className='h-6 w-6' strokeWidth={2} />
            )}
          </IconButton>
          <div className='sm:block md:hidden min-w-[180px]'>
            <span className='text-xl w-10 font-semibold ml-2'>Dịch vụ nhận tiền</span>
          </div>
          <Link to={'/'} className='sm:block md:hidden min-w-[50px] items-right'>
            <img className='text-2xl w-12 font-semibold ml-10' src={logo_w} />
          </Link>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
    </>
  )
}

export default Header
