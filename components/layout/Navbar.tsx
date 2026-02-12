'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Home, Code, Briefcase, Mail, Globe, ChevronDown } from 'lucide-react'
import type { Locale } from '@/lib/i18n'

type Links = 'expertise' | 'projects' | 'experience' | 'contact' | 'blog' | 'cirth'

type NavbarProps = {
  locale: Locale
  basePath?: string
  englishHref?: string
  navLabels: {
    expertise: string
    projects: string
    experience: string
    contact: string
    blog: string
    cirth: string
    language: string
  }
}

const Navbar = ({ locale, basePath, englishHref = '/en', navLabels }: NavbarProps) => {
  const [hovered, setHovered] = useState<Links | null>(null)
  const [active, setActive] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'uz' as Locale, label: 'UZ', name: 'Uzbek', flag: '🇺🇿' },
    { code: 'en' as Locale, label: 'EN', name: 'English', flag: '🇬🇧' },
  ]
  const currentLang = languages.find((l) => l.code === locale) || languages[1]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'expertise', label: navLabels.expertise, icon: <Code className='w-4 h-4' /> },
    { id: 'projects', label: navLabels.projects, icon: <Home className='w-4 h-4' /> },
    {
      id: 'experience',
      label: navLabels.experience,
      icon: <Briefcase className='w-4 h-4' />,
    },
    { id: 'contact', label: navLabels.contact, icon: <Mail className='w-4 h-4' /> },
  ]
  const localizedRoot = basePath ?? `/${locale}`
  const sectionHref = (sectionId: string) => `${localizedRoot}#${sectionId}`
  const homeHref = localizedRoot || '/'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-3'
        }`}
      >
        <div className='mx-4 md:mx-8 xl:mx-12'>
          <div
            className={`relative rounded-2xl border transition-all duration-500 backdrop-blur-md ${
              scrolled
                ? 'bg-black/40 border-white/20 shadow-lg shadow-black/20'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <div className='px-6 py-3 flex justify-between items-center'>
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
                href={homeHref}
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
                    href={sectionHref(item.id)}
                    className={`group relative px-3 xl:px-4 py-2 font-bold transition-all duration-300 hover:scale-105 ${
                      hovered && hovered !== item.id
                        ? 'opacity-50'
                        : 'opacity-100'
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
                    {`// ${navLabels.blog}`}
                  </span>
                  <small className='absolute -top-1 -right-1 xl:right-0 text-xs opacity-70 text-green-300 font-normal group-hover:opacity-100 transition-opacity duration-300'>
                    05
                  </small>
                </Link>

                {/* Cirth Link */}
                <Link
                  href='https://cirth.uz'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`group relative px-3 xl:px-4 py-2 font-bold transition-all duration-300 hover:scale-105 ${
                    hovered && hovered !== 'cirth' ? 'opacity-50' : 'opacity-100'
                  }`}
                  onMouseEnter={() => setHovered('cirth')}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className='relative z-10 text-white group-hover:text-purple-400 transition-colors duration-300'>
                    {`// ${navLabels.cirth}`}
                  </span>
                  <small className='absolute -top-1 -right-1 xl:right-0 text-xs opacity-70 text-purple-300 font-normal group-hover:opacity-100 transition-opacity duration-300'>
                    06
                  </small>
                </Link>

                {/* Language Switcher - Code Style Dropdown */}
                <div className='lg:flex items-center pl-3 border-l border-white/15 ml-2' ref={langRef}>
                  <div className='relative'>
                    <button
                      onClick={() => setLangOpen(!langOpen)}
                      className='group flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 transition-all duration-300'
                    >
                      <Globe className='w-4 h-4 text-cyan-400' />
                      <span className='text-sm font-bold text-white group-hover:text-cyan-300 transition-colors'>
                        {currentLang.label}
                      </span>
                      <ChevronDown
                        className={`w-3 h-3 text-white/60 group-hover:text-cyan-300 transition-all duration-300 ${
                          langOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-full right-0 mt-2 w-48 overflow-hidden rounded-xl bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/50 transition-all duration-300 ${
                        langOpen
                          ? 'opacity-100 translate-y-0 visible'
                          : 'opacity-0 -translate-y-2 invisible'
                      }`}
                    >
                      <div className='p-2 space-y-1'>
                        <div className='px-3 py-2 text-xs text-white/40 uppercase tracking-wider font-mono'>
                          {`// ${navLabels.language}`}
                        </div>
                        {languages.map((lang, i) => (
                          <Link
                            key={lang.code}
                            href={lang.code === 'en' ? englishHref : `/${lang.code}`}
                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                              locale === lang.code
                                ? 'bg-cyan-500/20 border border-cyan-400/30'
                                : 'hover:bg-white/5 border border-transparent'
                            }`}
                            onClick={() => setLangOpen(false)}
                          >
                            <span className='text-base'>{lang.flag}</span>
                            <div className='flex-1'>
                              <span
                                className={`text-sm font-bold transition-colors ${
                                  locale === lang.code ? 'text-cyan-300' : 'text-white/80 group-hover:text-white'
                                }`}
                              >
                                {lang.name}
                              </span>
                              <span className='block text-xs text-white/40 font-mono'>{`// ${lang.label}`}</span>
                            </div>
                            {locale === lang.code && (
                              <span className='w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' />
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen z-40 transition-all duration-500 ${
          active
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className='absolute inset-0 bg-black/60 backdrop-blur-sm'
          onClick={() => setActive(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 left-0 w-80 max-w-[90vw] h-full backdrop-blur-md border-r border-white/20 transition-transform duration-500 ${
            active ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{
            background:
              'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
          }}
        >
          <div className='p-8 space-y-8'>
            {/* Close Button */}
            <button
              className='absolute top-6 right-6 w-12 h-12 flex justify-center items-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-400/50 group transition-all duration-300 hover:scale-110'
              onClick={() => setActive(false)}
            >
              <X
                size={20}
                className='group-hover:text-red-400 transition-colors duration-300'
              />
            </button>

            {/* Logo */}
            <div className='pt-4'>
              <Image src='/logo.png' alt='logo' width={160} height={44} />
            </div>

            {/* Navigation Items - Code Style */}
            <div className='space-y-3'>
              {navItems.map((item, i) => (
                <Link
                  key={item.id}
                  href={sectionHref(item.id)}
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
                  {`// ${navLabels.blog}`}
                </div>
                <small className='absolute top-2 right-4 text-xs opacity-70 text-green-300 font-normal group-hover:opacity-100 transition-opacity duration-300'>
                  05
                </small>
              </Link>

              {/* Cirth Link */}
              <Link
                href='https://cirth.uz'
                target='_blank'
                rel='noopener noreferrer'
                className='group relative p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 block'
                onClick={() => setActive(false)}
              >
                <div className='font-bold text-white group-hover:text-purple-400 transition-colors duration-300 text-lg'>
                  {`// ${navLabels.cirth}`}
                </div>
                <small className='absolute top-2 right-4 text-xs opacity-70 text-purple-300 font-normal group-hover:opacity-100 transition-opacity duration-300'>
                  06
                </small>
              </Link>

              {/* Mobile Language Switcher */}
              <div className='pt-4 border-t border-white/10'>
                <div className='px-2 pb-3 text-xs text-white/40 uppercase tracking-wider font-mono'>
                  {`// ${navLabels.language}`}
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={lang.code === 'en' ? englishHref : `/${lang.code}`}
                      className={`group flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                        locale === lang.code
                          ? 'bg-cyan-500/20 border-cyan-400/50'
                          : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                      }`}
                      onClick={() => setActive(false)}
                    >
                      <span className='text-lg'>{lang.flag}</span>
                      <div className='flex-1 text-left'>
                        <span
                          className={`block text-sm font-bold ${
                            locale === lang.code ? 'text-cyan-300' : 'text-white/80 group-hover:text-white'
                          }`}
                        >
                          {lang.name}
                        </span>
                        <span className='text-xs text-white/40 font-mono'>{`// ${lang.label}`}</span>
                      </div>
                      {locale === lang.code && (
                        <span className='w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
