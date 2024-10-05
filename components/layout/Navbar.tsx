'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Links = 'home' | 'expertise' | 'work' | 'experience' | 'contact'

const Navbar = () => {
  const [hovered, setHovered] = useState<Links | null>(null)
  return (
    <nav className='absolute top-0 left-0 w-full h-[12vh] z-20 px-[4vh]'>
      <div className='w-full h-full flex justify-start items-center gap-8 xl:gap-12'>
        <Link
          href='/'
          className='hover:opacity-50 transition-opacity duration-300'
        >
          <Image
            src='/logo.png'
            className='lg:hidden xl:block'
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
          {['home', 'expertise', 'work', 'experience', 'contact'].map(
            (v, i) => (
              <Link
                href={`/#${v}`}
                className={`font-bold relative transition-opacity duration-300 px-4 xl:px-5 ${
                  hovered && hovered !== v && 'opacity-50'
                }`}
                key={i}
                onMouseEnter={() => setHovered(v as Links)}
                onMouseLeave={() => setHovered(null)}
              >
                // {v}
                <small className='absolute top-1 right-4 xl:right-5 -translate-y-full text-xs opacity-70'>
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </small>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
