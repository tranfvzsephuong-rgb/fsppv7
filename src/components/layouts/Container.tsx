/* eslint-disable @typescript-eslint/no-explicit-any */

const Container = ({ classNameBg = 'bg-white', className, children }: any) => {
  return (
    <section className={`${classNameBg}`}>
      <div className={`${className} max-w-[1160px] mx-auto px-3 md:px-0`}>{children}</div>
    </section>
  )
}

export default Container
