import Footer from '~/components/layouts/Footer'
import Header from '~/components/layouts/Header'
import { LayoutPropsInterface } from '~/utils/base'

const HomeLayout = ({ children }: LayoutPropsInterface) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default HomeLayout
