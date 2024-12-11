'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

type Links = 'expertise' | 'projects' | 'experience' | 'contact' | 'blog'

const Navbar = () => {
  const [hovered, setHovered] = useState<Links | null>(null)
  const [active, setActive] = useState(false)

  return (
    <>
      <nav className='absolute top-0 left-0 w-full h-[12vh] z-30 px-4 md:px-[4vh]'>
        <div className='w-full h-full flex justify-start items-center gap-4 lg:gap-8 xl:gap-12'>
          <button
            className='w-14 h-14 flex lg:hidden justify-center items-center rounded-full bg-slate-400/5 hover:bg-slate-400/10 group transition-colors duration-200'
            onClick={() => setActive(true)}
          >
            <Menu
              size={24}
              className='group-hover:text-blue-400 transition-colors duration-200'
            />
          </button>
          <Link
            href='/'
            className='hover:opacity-50 transition-opacity duration-300'
          >
            <Image
              src='/logo.png'
              className='block lg:hidden xl:block'
              alt='logo'
              width={220}
              height={60}
            />
            <Image
              src='/cropped-logo.png'
              className='hidden lg:block xl:hidden'
              alt='logo'
              width={100}
              height={100}
            />
          </Link>
          <div className='text-md lg:text-xl flex-1 lg:flex items-center justify-center hidden ml-[-100px] xl:ml-[-220px]'>
            {['expertise', 'projects', 'experience', 'contact'].map((v, i) => (
              <Link
                href={`/#${v}`}
                className={`font-bold relative transition-opacity duration-300 px-4 xl:px-5 ${
                  hovered && hovered !== v && 'opacity-50'
                }`}
                key={i}
                onMouseEnter={() => setHovered(v as Links)}
                onMouseLeave={() => setHovered(null)}
              >
                {`// ${v}`}
                <small className='absolute top-1 right-4 xl:right-5 -translate-y-full text-xs opacity-70'>
                  {`0${i + 1}`}
                </small>
              </Link>
            ))}
            <Link
              href='https://blog.abdukahhar.uz'
              className={`font-bold relative transition-opacity duration-300 px-4 xl:px-5 ${
                hovered && hovered !== 'blog' && 'opacity-50'
              }`}
              onMouseEnter={() => setHovered('blog' as Links)}
              onMouseLeave={() => setHovered(null)}
            >
              {'// blog'}
              <small className='absolute top-1 right-4 xl:right-5 -translate-y-full text-xs opacity-70'>
                05
              </small>
            </Link>
          </div>
        </div>
      </nav>
      <div
        className={
          'fixed top-0 left-0 w-[calc(100vw-4vh)] z-40 h-screen bg-gray-800 py-28 px-6 flex-col gap-4 flex -translate-x-full opacity-0 transition-all duration-300 ' +
          (active && 'translate-x-0 opacity-100')
        }
      >
        <button
          className='absolute top-6 right-8 w-12 h-12 flex justify-center items-center hover:bg-slate-400/10 rounded-full'
          onClick={() => setActive(false)}
        >
          <X size={30} />
        </button>
        {['expertise', 'work', 'experience', 'contact'].map((v, i) => (
          <Link
            href={`/#${v}`}
            className='font-bold relative transition-opacity duration-300 px-4 xl:px-5'
            onClick={() => setActive(false)}
            key={i}
          >
            {`// ${v}`}
          </Link>
        ))}
        <Link
          href='https://blog.abdukahhar.uz'
          className={`font-bold relative transition-opacity duration-300 px-4 xl:px-5 ${
            hovered && hovered !== 'blog' && 'opacity-50'
          }`}
          onMouseEnter={() => setHovered('blog' as Links)}
          onMouseLeave={() => setHovered(null)}
        >
          {'// blog'}
        </Link>
      </div>
    </>
  )
}

export default Navbar
