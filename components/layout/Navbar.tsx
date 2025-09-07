'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Home, Code, Briefcase, Mail } from 'lucide-react'

type Links = 'expertise' | 'projects' | 'experience' | 'contact' | 'blog'

const Navbar = () => {
  const [hovered, setHovered] = useState<Links | null>(null)
  const [active, setActive] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'expertise', label: 'expertise', icon: <Code className='w-4 h-4' /> },
    { id: 'projects', label: 'projects', icon: <Home className='w-4 h-4' /> },
    { id: 'experience', label: 'experience', icon: <Briefcase className='w-4 h-4' /> },
    { id: 'contact', label: 'contact', icon: <Mail className='w-4 h-4' /> }
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-30 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-3'
      }`}>
        <div className='mx-4 md:mx-8 xl:mx-12'>
          <div className={`relative rounded-2xl border transition-all duration-500 backdrop-blur-md ${
            scrolled 
              ? 'bg-black/40 border-white/20 shadow-lg shadow-black/20' 
              : 'bg-white/5 border-white/10'
          }`}>
            <div className='px-6 py-4 flex justify-between items-center'>
              
              {/* Mobile Menu Button */}
              <button
                className='flex lg:hidden justify-center items-center w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 group transition-all duration-300 hover:scale-110'
                onClick={() => setActive(true)}
              >
                <Menu
                  size={20}
                  className='group-hover:text-purple-400 transition-colors duration-300'
                />
              </button>

              {/* Logo */}
              <Link
                href='/'
                className='hover:scale-105 transition-transform duration-300'
              >
                <Image
                  src='/logo.png'
                  className='block lg:hidden xl:block'
                  alt='logo'
                  width={scrolled ? 180 : 220}
                  height={scrolled ? 48 : 60}
                />
                <Image
                  src='/cropped-logo.png'
                  className='hidden lg:block xl:hidden'
                  alt='logo'
                  width={scrolled ? 80 : 100}
                  height={scrolled ? 80 : 100}
                />
              </Link>

              {/* Desktop Navigation - Code Style */}
              <div className='hidden lg:flex items-center justify-center flex-1 gap-1 xl:gap-2 ml-[-100px] xl:ml-[-220px]'>
                {navItems.map((item, i) => (
                  <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    className={`group relative px-3 xl:px-4 py-2 font-bold transition-all duration-300 hover:scale-105 ${
                      hovered && hovered !== item.id ? 'opacity-50' : 'opacity-100'
                    }`}
                    onMouseEnter={() => setHovered(item.id as Links)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className='relative z-10 text-white group-hover:text-blue-400 transition-colors duration-300'>
                      {`// ${item.label}`}
                    </span>
                    <small className='absolute -top-1 -right-1 xl:right-0 text-xs opacity-70 text-blue-300 font-normal group-hover:opacity-100 transition-opacity duration-300'>
                      {`0${i + 1}`}
                    </small>
                  </Link>
                ))}
                
                {/* Blog Link */}
                <Link
                  href='https://blog.abdukahhar.uz'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`group relative px-3 xl:px-4 py-2 font-bold transition-all duration-300 hover:scale-105 ${
                    hovered && hovered !== 'blog' ? 'opacity-50' : 'opacity-100'
                  }`}
                  onMouseEnter={() => setHovered('blog')}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className='relative z-10 text-white group-hover:text-green-400 transition-colors duration-300'>
                    {`// blog`}
                  </span>
                  <small className='absolute -top-1 -right-1 xl:right-0 text-xs opacity-70 text-green-300 font-normal group-hover:opacity-100 transition-opacity duration-300'>
                    05
                  </small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen z-40 transition-all duration-500 ${
          active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className='absolute inset-0 bg-black/60 backdrop-blur-sm'
          onClick={() => setActive(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute top-0 left-0 w-80 max-w-[90vw] h-full backdrop-blur-md border-r border-white/20 transition-transform duration-500 ${
          active ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)'
        }}>
          <div className='p-8 space-y-8'>
            {/* Close Button */}
            <button
              className='absolute top-6 right-6 w-12 h-12 flex justify-center items-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-400/50 group transition-all duration-300 hover:scale-110'
              onClick={() => setActive(false)}
            >
              <X size={20} className='group-hover:text-red-400 transition-colors duration-300' />
            </button>
            
            {/* Logo */}
            <div className='pt-4'>
              <Image
                src='/logo.png'
                alt='logo'
                width={160}
                height={44}
              />
            </div>
            
            {/* Navigation Items - Code Style */}
            <div className='space-y-3'>
              {navItems.map((item, i) => (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  className='group relative p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 block'
                  onClick={() => setActive(false)}
                >
                  <div className='font-bold text-white group-hover:text-blue-400 transition-colors duration-300 text-lg'>
                    {`// ${item.label}`}
                  </div>
                  <small className='absolute top-2 right-4 text-xs opacity-70 text-blue-300 font-normal group-hover:opacity-100 transition-opacity duration-300'>
                    {`0${i + 1}`}
                  </small>
                </Link>
              ))}
              
              {/* Blog Link */}
              <Link
                href='https://blog.abdukahhar.uz'
                target='_blank'
                rel='noopener noreferrer'
                className='group relative p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-105 block'
                onClick={() => setActive(false)}
              >
                <div className='font-bold text-white group-hover:text-green-400 transition-colors duration-300 text-lg'>
                  {`// blog`}
                </div>
                <small className='absolute top-2 right-4 text-xs opacity-70 text-green-300 font-normal group-hover:opacity-100 transition-opacity duration-300'>
                  05
                </small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar