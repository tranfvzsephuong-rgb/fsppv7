import Banner from '../assets/images/image-banner.png'
import payIcon from '../assets/images/pay-at-agent.svg'
import sendMoney from '../assets/images/send-money.svg'
import sendHome from '../assets/images/send-home.svg'
import service from '../assets/images/service.svg'
import instructional from '../assets/images/instructional-receive-method.svg'
import instructionalReceiver from '../assets/images/instructional-receiver.svg'
import instructionalCard from '../assets/images/instructional-card-id.svg'
import instructionalSend from '../assets/images/instructional-send-n-receive.svg'
import serviceAvailable from '../assets/images/service-available.png'
// import Img from '~/assets/images/images.png'
// import { useTranslation } from 'react-i18next'
const Main = () => {
  // const { t } = useTranslation()
  return (
    <>
      {/* Banner Section */}
      <section className='section-banner bg-[#fd0] overflow-x-hidden flex justify-center mt-8 sm:mt-10 lg:mt-20'>
        <div className='container'>
          <div className='flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-0'>
            <div className='w-full lg:w-[56%] flex flex-col items-center lg:items-start text-center lg:text-left'>
              <div className='py-8 lg:py-0'>
                <h1 className='2xl:text-[4.75rem] xl:text-[3.75rem] md:text-[3rem] text-[2rem] text-black mb-3 font-bold leading-none 2xl:mb-10'>
                  Nhận tiền theo cách của bạn.
                </h1>
                <div className='short-content text-base lg:text-[1.25rem]'>
                  Chọn một trong những lựa chọn nhận tiền chuyển thuận tiện của chúng tôi.
                </div>
              </div>
            </div>
            <div className='w-full lg:w-[42%] flex justify-center'>
              <div className='img_banner relative w-full flex justify-center'>
                <picture>
                  <source media='(min-width:450px)' srcSet={Banner} />
                  <source media='(min-width:0px)' srcSet={Banner} />
                  <img
                    loading='lazy'
                    src={Banner}
                    alt='Banner'
                    className='img-fluid w-full max-w-[400px] lg:max-w-[500px] xl:max-w-[600px]'
                    width={1024}
                    height={717}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Receive Methods Section */}
      <section className='mt-8 xl:mt-14 flex justify-center px-2'>
        <div className='container'>
          <h2 className='text-center mb-5 xl:mb-10 2xl:text-[3.75rem] lg:text-[2.5rem] xl:text-[3rem] text-[1.75rem] 2xl:leading-[3.75rem] lg:leading-[2.5rem] xl:leading-[3rem] leading-[1.75rem] font-bold'>
            Cách nhận tiền ở Việt Nam
          </h2>
          <p className='text-center text-lg xl:text-[1.5rem]'>
            Western Union cung cấp nhiều cách thuận tiện để bạn nhận khoản tiền chuyển. Yêu cầu người gửi chọn phương án
            tốt nhất cho bạn!
          </p>
          <div className='max-w-[1624px] mx-auto px-2'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 xl:mt-12 mt-8'>
              <div className='flex flex-col items-center'>
                <div className='item flex flex-col items-center'>
                  <div className='flex justify-center mb-6'>
                    <img loading='lazy' src={payIcon} alt='Tiền mặt tại đại lý' className='img-fluid w-16 md:w-20' />
                  </div>
                  <p className='text-center xl:text-[2rem] lg:text-[1.5rem] text-[1.125rem] font-bold'>
                    Tiền mặt tại đại lý.
                  </p>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='item flex flex-col items-center'>
                  <div className='flex justify-center mb-6'>
                    <img
                      loading='lazy'
                      src={sendMoney}
                      alt='Gửi tài khoản ngân hàng'
                      className='img-fluid w-16 md:w-20'
                    />
                  </div>
                  <p className='text-center xl:text-[2rem] lg:text-[1.5rem] text-[1.125rem] font-bold'>
                    Gửi tài khoản ngân hàng.
                  </p>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='item flex flex-col items-center'>
                  <div className='flex justify-center mb-6'>
                    <img loading='lazy' src={sendHome} alt='Giao tiền tận nhà' className='img-fluid w-16 md:w-20' />
                  </div>
                  <p className='text-center xl:text-[2rem] lg:text-[1.5rem] text-[1.125rem] font-bold'>
                    Giao tiền tận nhà.
                  </p>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='item flex flex-col items-center'>
                  <div className='flex justify-center mb-6'>
                    <img
                      loading='lazy'
                      src={service}
                      alt='Dịch vụ ngân hàng trực tuyến và di động'
                      className='img-fluid w-16 md:w-20'
                    />
                  </div>
                  <p className='text-center xl:text-[2rem] lg:text-[1.5rem] text-[1.125rem] font-bold'>
                    Dịch vụ ngân hàng trực tuyến và di động của đại lý đã chọn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='section-directly mt-8 xl:mt-14 flex justify-center px-2'>
        <div className='container'>
          <h2 className='text-center mb-10 2xl:mb-14 2xl:text-[3.75rem] lg:text-[2.5rem] xl:text-[3rem] text-[1.75rem] 2xl:leading-[3.75rem] lg:leading-[2.5rem] xl:leading-[3rem] leading-[1.75rem] font-bold'>
            Cách nhận tiền mặt tại đại lý
          </h2>
          <div className='max-w-5xl mx-auto'>
            <div className='list-directly flex flex-wrap -mx-3 md:mx-0'>
              <div className='w-1/2 md:w-full mb-10 item-directly px-3 md:px-0'>
                <div className='flex flex-wrap md:items-center h-full md:-mx-3 flex-col md:flex-row'>
                  <div className='w-full md:w-1/2 md:px-3 mb-6 md:mb-0'>
                    <p className='w-10 h-10 text-white rounded-full bg-[#e94368] flex justify-center items-center mb-6'>
                      1
                    </p>
                    <h3 className='inline-block md:block lg:text-[1.75rem] text-[1.125rem] font-bold'>
                      Đến đại lý Western Union.
                    </h3>
                  </div>
                  <div className='w-full md:w-1/2 md:px-3 mt-auto flex justify-end'>
                    <div className='box_img max-w-[16.25rem]'>
                      <img loading='lazy' src={instructional} className='img-fluid' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-1/2 md:w-full mb-10 item-directly px-3 md:px-0'>
                <div className='flex flex-wrap md:items-center h-full md:-mx-3 flex-col md:flex-row'>
                  <div className='w-full md:w-1/2 md:px-3 mb-6 md:mb-0'>
                    <p className='w-10 h-10 text-white rounded-full bg-[#e94368] flex justify-center items-center mb-6'>
                      2
                    </p>
                    <h3 className='inline-block md:block lg:text-[1.75rem] text-[1.125rem] font-bold'>
                      Cung cấp thông tin người gửi, bao gồm Mã số chuyển tiền (MTCN)
                    </h3>
                  </div>
                  <div className='w-full md:w-1/2 md:px-3 mt-auto '>
                    <div className='box_img max-w-[16.25rem]'>
                      <img loading='lazy' src={instructionalReceiver} className='img-fluid' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-1/2 md:w-full mb-10 item-directly px-3 md:px-0'>
                <div className='flex flex-wrap md:items-center h-full md:-mx-3 flex-col md:flex-row'>
                  <div className='w-full md:w-1/2 md:px-3 mb-6 md:mb-0'>
                    <p className='w-10 h-10 text-white rounded-full bg-[#e94368] flex justify-center items-center mb-6'>
                      3
                    </p>
                    <h3 className='inline-block md:block lg:text-[1.75rem] text-[1.125rem] font-bold'>
                      Trình CMND có ảnh do chính phủ cấp.
                    </h3>
                  </div>
                  <div className='w-full md:w-1/2 md:px-3 mt-auto flex justify-end'>
                    <div className='box_img max-w-[16.25rem]'>
                      <img
                        loading='lazy'
                        src={instructionalCard}
                        className='img-fluid'
                        alt='CMND có ảnh do chính phủ cấp'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-1/2 md:w-full mb-10 item-directly px-3 md:px-0'>
                <div className='flex flex-wrap md:items-center h-full md:-mx-3 flex-col md:flex-row'>
                  <div className='w-full md:w-1/2 md:px-3 mb-6 md:mb-0'>
                    <p className='w-10 h-10 text-white rounded-full bg-[#e94368] flex justify-center items-center mb-6'>
                      4
                    </p>
                    <h3 className='inline-block md:block lg:text-[1.75rem] text-[1.125rem] font-bold'>
                      Nhận tiền sau khi thông tin chi tiết của bạn được xác minh
                    </h3>
                  </div>
                  <div className='w-full md:w-1/2 md:px-3 mt-auto '>
                    <div className='box_img max-w-[16.25rem]'>
                      <img
                        loading='lazy'
                        src={instructionalSend}
                        className='img-fluid'
                        alt='Nhận tiền sau khi xác minh'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-center xl:mt-20 mt-10'>
            <a
              href='/dichvunhantien'
              className='inline-block py-3 px-12 xl:text-[1.5rem] text-[1.125rem] bg-[#fd0] border border-solid border-[#fd0] transition-all duration-500 rounded-full hover:bg-[#ccb100]'
              title='Tìm đại lý'
            >
              Tìm đại lý
            </a>
          </div>
        </div>
      </section>

      <section className='mt-8 xl:mt-14 flex justify-center '>
        <div className='container'>
          <h2 className='text-center mb-5 2xl:mb-8 2xl:text-[3.75rem] lg:text-[2.5rem] xl:text-[3rem] text-[1.75rem] font-bold max-w-6xl mx-auto 2xl:leading-[3.75rem] lg:leading-[2.5rem] xl:leading-[3rem] leading-[1.75rem]'>
            Nhận tiền với dịch vụ chuyển tiền tận nhà của chúng tôi
          </h2>
          <p className='text-center text-lg xl:text-[1.5rem] max-w-6xl mx-auto'>
            Bạn không cần rời nhà để nhận tiền chuyển. Chúng tôi có thể gửi tiền mặt không có phụ phí ở VND hoặc USD
            trực tiếp đến địa chỉ của bạn trong vòng 48 giờ
          </p>
          <div className='flex justify-center xl:mt-20 mt-10'>
            <a
              href='/dichvunhantien'
              className='inline-block py-3 px-12 xl:text-[1.5rem] text-[1.125rem] bg-[#fd0] border border-solid border-[#fd0] transition-all duration-500 rounded-full hover:bg-[#ccb100]'
              title='Tìm hiểu thêm'
            >
              Tìm hiểu thêm
            </a>
          </div>
        </div>
      </section>
      <section className='mt-8 xl:mt-14 pt-8 xl:pt-14 bg-[#f2f2f2] flex justify-center '>
        <div className='container'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-center mb-4 2xl:text-[3.75rem] lg:text-[2.5rem] xl:text-[3rem] text-[1.75rem] font-bold 2xl:leading-[3.75rem] lg:leading-[2.5rem] xl:leading-[3rem] leading-[1.75rem]'>
              Nhận tiền với dịch vụ ngân hàng trực tuyến và di động của đại lý đã chọn
            </h2>
            <div className='xl:text-[1.5rem] s-content px-2'>
              <p>&nbsp;</p>{' '}
              <p>
                <strong>Ngân hàng trực tuyến</strong>
                <br />
                &nbsp;
              </p>{' '}
              <p>
                Bạn có thể nhận tiền chuyển Western Union qua dịch vụ ngân hàng trực tuyến hoặc di động bằng vài bước
                đơn giản. Chọn dịch vụ phù hợp nhất với bạn và xem nội dung dưới đây để tìm hiểu cách làm.
              </p>{' '}
              <p>&nbsp;</p>{' '}
              <p>
                1. <strong>Đăng nhập.</strong>&nbsp;Đăng nhập trực tuyến vào tài khoản ngân hàng của bạn nếu bạn có tài
                khoản với một trong các ngân hàng đối tác của chúng tôi.
              </p>{' '}
              <p>
                2. <strong>Điền thông tin chuyển tiền.</strong>&nbsp;Nhập thông tin người nhận và mã số theo dõi (MTCN),
                sau đó chọn khoản tiền chuyển.
              </p>{' '}
              <p>
                3. <strong>Nhận tiền.</strong>&nbsp;Chọn tài khoản&nbsp;bạn muốn gửi tiền vào. Biên nhận sẽ xuất hiện
                cho biết việc chuyển tiền của bạn đã hoàn tất.
              </p>{' '}
              <p>&nbsp;</p> <p style={{ textAlign: 'center' }}>Dịch vụ có sẵn ở:</p> <p>&nbsp;</p> <p>&nbsp;</p>{' '}
              <p>
                <img
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                  src={serviceAvailable}
                  alt=''
                  width={300}
                  height={38}
                  className='w-[300px] h-[38px]'
                />
              </p>{' '}
              <p>&nbsp;</p> <p>&nbsp;</p> <p>&nbsp;</p>{' '}
            </div>
          </div>
        </div>
      </section>
      <section className='py-8 px-2 xl:py-14 bg-black  flex justify-center '>
        <div className='container'>
          <div className='max-w-[1460px] mx-auto'>
            <div className='s-content text-white lg:text-[1.25rem] xl:text-[1.5rem]'>
              <p>1.&nbsp;Kiểm tra bộ định vị đại lý trên WU.com để biết vị trí đại lý và quốc gia.</p> <p>&nbsp;</p>{' '}
              <p>
                2.&nbsp;Hãy cẩn thận khi cung cấp thông tin tài khoản ngân hàng. Khoản tiền sẽ được thanh toán vào tài
                khoản ngân hàng tương ứng với số tài khoản bạn cung cấp.
              </p>{' '}
              <p>&nbsp;</p> <p>3.&nbsp;Tuân theo điều khoản và điều kiện dịch vụ.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Main
