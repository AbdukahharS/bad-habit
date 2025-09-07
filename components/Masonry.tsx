import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

type MasonryProps = {
  items: {
    name: string
    description: string
    image: string
    live: string | null
    source: string | null
    tags: string[]
    category: string
  }[]
  current:
    | 'All'
    | 'Frontend Only Website'
    | 'Full Stack Website'
    | 'Figma Design'
}

const Masonry: React.FC<MasonryProps> = ({ items, current }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const divs = containerRef.current?.children
    if (divs) {
      for (const i in divs) {
        const div = divs[i]

        if (!!div && typeof div === 'object') {
          const category = div.querySelector('span')
          if (current === 'All' || current === category?.textContent) {
            if (div.classList.contains('hidden')) {
              div.classList.remove('hidden')
              setTimeout(() => {
                div.classList.remove('scale-0')
                div.classList.add('scale-100')
              }, 300) // wait for 300ms before adding the scale-100 class
            }
          } else {
            if (!div.classList.contains('hidden')) {
              div.classList.remove('scale-100')
              div.classList.add('scale-0')
              setTimeout(() => {
                div.classList.add('hidden')
              }, 300)
            }
          }
        }
      }
    }
  }, [current])

  return (
    <div
      className='columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 lg:gap-8 space-y-4 lg:space-y-8 py-16'
      ref={containerRef}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className='break-inside-avoid rounded-xl overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2'
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className='relative overflow-hidden rounded-t-xl'>
            <Image
              src={`/projects/${item.image}`}
              alt={`${item.name} project screenshot`}
              width={600}
              height={300}
              className='w-full h-auto transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </div>
          
          <div className='p-6 space-y-4'>
            <span className='hidden'>{item.category}</span>
            
            <div className='space-y-3'>
              <h3 className='text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 font-poppins'>
                {item.name}
              </h3>
              <p className='text-gray-300 text-sm leading-relaxed line-clamp-3'>
                {item.description}
              </p>
            </div>

            {item.tags.length > 0 && (
              <div className='flex flex-wrap gap-2 pt-2'>
                {item.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className='px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm'
                  >
                    {tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className='px-2 py-1 text-xs font-medium rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30'>
                    +{item.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            <div className='flex items-center justify-between pt-4 border-t border-white/10'>
              <div className='flex gap-3'>
                {item.live && (
                  <Link
                    href={item.live}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center px-3 py-2 text-xs font-semibold text-white bg-blue-600/80 hover:bg-blue-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25'
                  >
                    <svg className='w-3 h-3 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                    </svg>
                    Live
                  </Link>
                )}
                {item.source && (
                  <Link
                    href={item.source}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center px-3 py-2 text-xs font-semibold text-gray-300 bg-gray-800/80 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25'
                  >
                    <svg className='w-3 h-3 mr-1' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
                    </svg>
                    Code
                  </Link>
                )}
              </div>
              
              <div className='text-xs font-medium text-gray-400 bg-gray-800/50 px-2 py-1 rounded-md border border-gray-700/50'>
                {item.category === 'Frontend Only Website' && '🌐'}
                {item.category === 'Full Stack Website' && '⚡'}
                {item.category === 'Figma Design' && '🎨'}
                {item.category === 'Desktop App' && '💻'}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Masonry
