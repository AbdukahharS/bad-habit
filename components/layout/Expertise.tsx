import Image from 'next/image'
import { Code, Zap, Server, Quote } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import type { ReactNode } from 'react'

type ExpertiseArea = {
  icon: ReactNode
  title: string
  highlight: string
  subtitle?: string
  description: string
  gradient: string
  bgGradient: string
}

const expertiseAreasByLocale: Record<Locale, ExpertiseArea[]> = {
  en: [
    {
      icon: <Code className='w-8 h-8' />,
      title: 'Software Development',
      highlight: 'Software',
      description: 'Experienced in both functional and OOP: JavaScript, TypeScript.',
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(244, 63, 94, 0.1) 100%)'
    },
    {
      icon: <Zap className='w-8 h-8' />,
      title: 'Frontend Development',
      highlight: 'Frontend Dev',
      subtitle: 'React, NextJS',
      description: 'Specialized in translating intricate designs into responsive interfaces. 4 years crafting production-ready applications with HTML, CSS, JS, React, NextJS and Vue.',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)'
    },
    {
      icon: <Server className='w-8 h-8' />,
      title: 'Backend Development',
      highlight: 'NodeJS Dev',
      description: 'Skilled in Backend development with Node.js and Bun, and building cross-platform desktop apps using Electron.js and Tauri',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)'
    }
  ]
  ,
  uz: [
    {
      icon: <Code className='w-8 h-8' />,
      title: 'Dasturiy ta`minot ishlab chiqish',
      highlight: 'Dasturiy',
      description: 'Funksional va OOP yondashuvlarida tajriba: JavaScript, TypeScript.',
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(244, 63, 94, 0.1) 100%)'
    },
    {
      icon: <Zap className='w-8 h-8' />,
      title: 'Frontend Dasturlash',
      highlight: 'Frontend',
      subtitle: 'React, NextJS',
      description: 'Murakkab dizaynlarni moslashuvchan interfeyslarga aylantirishga ixtisoslashganman. HTML, CSS, JS, React, NextJS va Vue bilan 4 yillik amaliy tajriba.',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)'
    },
    {
      icon: <Server className='w-8 h-8' />,
      title: 'Backend Dasturlash',
      highlight: 'NodeJS',
      description: 'Node.js va Bun bilan backend ishlab chiqishda, Electron.js va Tauri yordamida kross-platforma desktop ilovalar yaratishda tajribali.',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)'
    }
  ],
}

const quoteByLocale: Record<Locale, { text: string; author: string }> = {
  en: {
    text: '"No two things have been combined better than knowledge and patience."',
    author: '- Prophet Muhammad (peace be upon him)',
  },
  uz: {
    text: '"Ilm va sabrdan afzalroq uyg`unlik yo`q."',
    author: '- Muhammad (s.a.v.)',
  },
}

type ExpertiseProps = {
  title: string
  subtitle: string
  locale: Locale
}

const Expertise = ({ title, subtitle, locale }: ExpertiseProps) => {
  const expertiseAreas = expertiseAreasByLocale[locale]
  const quote = quoteByLocale[locale]

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes expertiseEnter {
            0% {
              opacity: 0;
              transform: translateY(50px) scale(0.9);
              filter: blur(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
          
          .expertise-card {
            animation: expertiseEnter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          }
          
          .code-tag {
            opacity: 0.4;
            font-family: 'Courier New', monospace;
            font-size: 0.75rem;
            color: #64748b;
          }
        `
      }} />
      
      <section className='px-6 md:px-12 xl:px-24 py-16 md:py-24' id='expertise'>
        <div className='text-center mb-16'>
          <div className='flex items-center justify-center gap-6 mb-6'>
            <div className='w-20 h-20 rounded-xl bg-linear-to-br from-purple-500 to-pink-600 flex items-center justify-center'>
              <Code className='size-12 text-white' />
            </div>
            <h2 className='text-5xl sm:text-8xl font-bold text-white font-poppins tracking-wide'>
              {title}
            </h2>
          </div>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
            {subtitle}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-6 lg:gap-0'>
          {expertiseAreas.map((area, index) => (
            <div
              key={index}
              className='expertise-card group relative'
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div
                className={`relative px-6 py-8 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] border-4 h-full ${
                  index === 0 ? 'border-slate-300 md:border-r-transparent' :
                  index === 1 ? 'border-slate-300 lg:border-r-transparent' :
                  'border-slate-300 md:border-t-transparent lg:border-t-slate-300'
                }`}
                style={{ 
                  background: area.bgGradient,
                  borderColor: 'rgba(203, 213, 225, 0.3)'
                }}
              >
                {/* Icon and Title with original styling */}
                <div className='flex items-center gap-5 mb-4'>
                  <div className={`p-3 rounded-xl bg-linear-to-r ${area.gradient} bg-opacity-20 border border-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                    <div className='text-white'>
                      {area.icon}
                    </div>
                  </div>
                  <h3 className='text-2xl font-bold text-white font-poppins group-hover:text-blue-300 transition-colors duration-300'>
                    <span className={`relative inline-block after:block after:absolute after:w-[calc(100%+4px)] after:h-2 after:bottom-1 after:left-[-2px] after:z-[-1] after:transition-all after:bg-gradient-to-r ${area.gradient} after:opacity-80 hover:after:opacity-100`}>
                      {area.highlight}
                    </span>
                    {area.title !== area.highlight && (
                      <span className='text-gray-300'> {area.title.replace(area.highlight, '')}</span>
                    )}
                    {area.subtitle && (
                      <div className='text-gray-400 font-medium text-base mt-1'>{area.subtitle}</div>
                    )}
                  </h3>
                </div>

                {/* Original HTML-style description with glassmorphism */}
                <div className='pl-9 relative'>
                  {/* Vertical line */}
                  <div className='absolute left-4 top-[24px] h-[calc(100%-48px)] border-l border-white/30 opacity-60'></div>

                  <div className="before:content-['<h3>'] before:mb-1 before:block before:opacity-40 before:ml-[-35px] before:text-sm before:font-mono before:text-slate-400 after:content-['</h3>'] after:mt-1 after:block after:opacity-40 after:ml-[-35px] after:text-sm after:font-mono after:text-slate-400">
                    <p className='text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300'>
                      {area.description}
                    </p>
                  </div>
                </div>

                {/* Glassmorphism hover overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${area.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </div>
          ))}
          
          {/* Original Quote Box - Hidden on certain screens */}
          <div className='p-6 justify-center items-center hidden md:flex lg:hidden relative'>
            <div className='relative p-6 rounded-2xl border border-white/10 backdrop-blur-sm group hover:border-purple-400/30 transition-all duration-500'
                 style={{ background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)' }}>
              <blockquote className='border-l-8 border-violet-600 pl-5'>
                <p className='text-2xl font-semibold mb-4 text-white group-hover:text-blue-300 transition-colors duration-300'>
                  {quote.text}
                </p>
                <cite className='text-purple-300 font-medium'>{quote.author}</cite>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className='mt-16 max-w-4xl mx-auto hidden'>
          <div className='relative p-8 rounded-2xl border border-white/10 backdrop-blur-sm group hover:border-purple-400/30 transition-all duration-500'
               style={{ background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)' }}>
            <div className='flex items-start gap-6'>
              <div className='p-3 rounded-xl bg-purple-500/20 border border-purple-400/30 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300'>
                <Quote className='w-6 h-6 text-purple-400' />
              </div>
              <blockquote className='flex-1'>
                <p className='text-xl sm:text-2xl font-semibold text-white mb-4 font-poppins leading-relaxed group-hover:text-blue-300 transition-colors duration-300'>
                  {quote.text}
                </p>
                <cite className='text-purple-300 font-medium'>{quote.author}</cite>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Background code image */}
        <div className='w-full -mt-10 flex justify-center opacity-20 pointer-events-none'>
          <Image
            src='/hello-world-html-code.png'
            alt='hello-world-code'
            width={582}
            height={291}
          />
        </div>
      </section>
    </>
  )
}

export default Expertise
