import { Poppins } from 'next/font/google'

import './circle.css'

const poppins = Poppins({ subsets: ['latin'], weight: '600' })

const Hero = () => {
  return (
    <section
      className='w-full h-screen flex justify-center items-center px-14 relative bg-[url("/home-cover.jpg")] bg-cover bg-center'
      id='hero'
    >
      <div
        className='absolute top-0 left-0 w-full h-full z-10'
        style={{
          backgroundImage:
            'linear-gradient(180deg, #00000012 60%, #1a191d 100%)',
        }}
      ></div>
      <div className='circle absolute w-14 h-14 rounded-full top-[20%] left-[55%] animate-[horizontal_3s_infinite_ease-in-out]'></div>
      <div className='circle absolute w-10 h-10 rounded-full top-[47%] left-[36%] animate-[vertical_3s_infinite_ease-in-out]'></div>
      <div className='w-full h-[90vh] z-20 flex justify-center items-center flex-col gap-4 lg:gap-8'>
        <h1
          className={
            '[text-shadow:_0_0_16px_rgb(0_0_0_/_50%)] text-4xl text-center md:text-6xl lg:text-7xl xl:text-9xl ' +
            poppins.className
          }
        >
          SHAHZOD <br className='hidden lg:inline' /> ABDUKAHHAR
        </h1>
        <h2 className='[text-shadow:_0_0_16px_rgb(0_0_0_/_50%)] text-xl md:text-2xl xl:text-3xl text-center font-semibold tracking-widest'>
          SOFTWARE ENGINEER, WEB DEVELOPER
        </h2>
      </div>
    </section>
  )
}

export default Hero
