// import { Link } from 'react-router-dom'
import logo from '~/assets/images/logowusmall-text.svg'
import twitter from '~/assets/images/twitter-2.svg'
import facebook from '~/assets/images/facebook-icon-1-1.svg'
import youtube from '~/assets/images/youtube-icon-1-1.svg'
// import phone from '~/assets/images/phone-gray.png'
// import { footerLink } from '~/constants/renaral.const'
// import zalo from '~/assets/images/Icon_of_Zalo.svg.png'
import { Typography } from '@material-tailwind/react'
const Footer = () => {
  const SITEMAP = [
    {
      title: 'Chuyển tiền',
      links: [
        { name: 'Gửi tiền', link: '' },
        { name: 'Nhận tiền từ nước ngoài', link: '/dichvunhantien' }
      ]
    },
    {
      title: 'Công cụ      ',
      links: [
        { name: 'Tìm vị trí', link: '' },
        { name: 'Theo dõi chuyển tiền', link: '' }
      ]
    },
    {
      title: 'Liên kết nhanh     ',
      links: [
        { name: 'Câu hỏi thường gặp', link: '' },
        { name: 'Liên hệ với chúng tôi', link: '' },
        { name: 'Nhận biết gian lận', link: '' }
      ]
    },
    {
      title: 'Pháp lý',
      links: [
        { name: 'Tuyên bố về quyền riêng tư trực tuyến', link: '' },
        { name: 'Điều khoản & Điều kiện ', link: '' },
        { name: 'Sở hữu trí tuệ', link: '' }
      ]
    }
  ]
  return (
    <footer className='relative w-full bg-[#383838] text-white text-base sm:text-lg xl:text-xl'>
      <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto grid w-full grid-cols-1 gap-6 sm:gap-8 py-8 sm:py-12 md:grid-cols-2 lg:grid-cols-4'>
          {SITEMAP.map(({ title, links }, key) => (
            <div key={key} className='w-full flex flex-col items-center sm:items-start'>
              <Typography
                variant='small'
                color='blue-gray'
                className='mb-3 font-semibold text-lg sm:text-xl uppercase opacity-50'
              >
                {title}
              </Typography>
              <ul className='space-y-1 w-full'>
                {links.map((link, key) => (
                  <Typography key={key} as='li' color='blue-gray' className='font-normal'>
                    <a
                      href={link.link}
                      className='inline-block py-1 pr-2 transition-transform hover:scale-105 font-semibold text-sm sm:text-base'
                    >
                      {link.name}
                    </a>
                  </Typography>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-black pt-6 sm:pt-8 xl:pt-14 footer-bottom flex justify-center'>
        <div className='container'>
          <div className='max-w-[1590px] mx-auto flex flex-col sm:flex-row justify-between items-center border-b border-solid border-[var(--border-footer-bottom)] pb-3 gap-4 sm:gap-0'>
            <div className='menu-footer-bottom w-full sm:w-3/4 flex flex-col sm:flex-row items-center sm:items-start'>
              <div className='flex flex-col sm:flex-row text-yellow-400 w-full sm:w-auto items-center sm:items-center justify-center sm:justify-start'>
                <a href='/dichvunhantien' title='Trang chủ' className='mb-2 sm:mb-0 sm:mr-4 hover:underline'>
                  Trang chủ
                </a>
                <a href='/dichvunhantien' title='Giới thiệu về chúng tôi' className='mb-2 sm:mb-0 sm:mr-4 hover:underline'>
                  Giới thiệu về chúng tôi
                </a>
                <a href='' title='Liên hệ với chúng tôi' className='mb-2 sm:mb-0 sm:mr-4 hover:underline'>
                  Liên hệ với chúng tôi
                </a>
                <a href='/dichvunhantien' title='Tuyên bố về quyền riêng tư' className='mb-2 sm:mb-0 hover:underline'>
                  Tuyên bố về quyền riêng tư
                </a>
              </div>
            </div>
            <div className='social-footer w-full sm:w-1/4 flex justify-center sm:justify-end mt-4 sm:mt-0'>
              <ul className='flex gap-4'>
                <li>
                  <a href='https://twitter.com/' target='_blank' rel='noopener'>
                    <img src={twitter} alt='' className='w-8 h-8 sm:h-10 sm:w-10 mt-0 sm:mt-2' />
                  </a>
                </li>
                <li>
                  <a href='https://www.facebook.com/' target='_blank' rel='noopener'>
                    <img src={facebook} alt='' className='h-8 sm:h-10 w-8 sm:w-10 mt-0 sm:mt-2' />
                  </a>
                </li>
                <li>
                  <a href='https://www.youtube.com/' target='_blank' rel='noopener'>
                    <img src={youtube} alt='' className='h-8 sm:h-10 w-8 sm:w-10 mt-0 sm:mt-2' />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='max-w-[1590px] mx-auto flex flex-col sm:flex-row flex-wrap border-b border-solid border-[var(--border-footer-bottom)] items-center py-3 gap-y-4 gap-x-6'>
            <div className='menu-footer-bottom-2 w-full sm:w-auto mb-2 sm:mb-0'>
              <ul className='grid grid-cols-1 pl-2 xl:pr-0 sm:grid-cols-3 gap-2 sm:gap-4'>
                <li>
                  <a href='' title='Sự nghiệp' className='sm:ml-0 hover:underline'>
                    Sự nghiệp
                  </a>
                </li>
                <li>
                  <a href='' title='Quan hệ nhà đầu tư' className='hover:underline'>
                    Quan hệ nhà đầu tư
                  </a>
                </li>
                <li>
                  <a href='' title='Sở hữu trí tuệ' className='hover:underline'>
                    Sở hữu trí tuệ
                  </a>
                </li>
              </ul>
            </div>
            <p className='copyright text-center sm:text-left text-xs sm:text-base'>
              © 2023 Western Union Holdings, Inc. Bảo lưu mọi quyền.
            </p>
          </div>
          <div className='py-2 lg:py-6 flex justify-center'>
            <a href='#' className='f-logo block'>
              <img loading='lazy' src={logo} className='img-fluid max-h-12 sm:max-h-16' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
