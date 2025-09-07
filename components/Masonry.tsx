import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Globe, Zap, Palette, Monitor } from 'lucide-react'

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

  // Get filtered items
  const filteredItems = React.useMemo(() => {
    return items.filter(
      (item) => current === 'All' || item.category === current
    )
  }, [items, current])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Add staggered animation delay for entrance
    const cards = container.querySelectorAll('.project-card')
    cards.forEach((card, index) => {
      const element = card as HTMLElement
      element.style.animationDelay = `${index * 0.1}s`
    })
  }, [filteredItems])

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes cardEnter {
            0% {
              opacity: 0;
              transform: scale(0.8) translateY(30px);
              filter: blur(8px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
              filter: blur(0px);
            }
          }
          
          .project-card {
            animation: cardEnter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .project-card:hover {
            transform: scale(1.02) translateY(-8px);
          }
          
          .masonry-container {
            transition: all 0.3s ease-out;
          }
          
          .masonry-grid {
            columns: 1;
            column-gap: 1.5rem;
            width: 100%;
          }
          
          @media (min-width: 768px) {
            .masonry-grid {
              columns: 2;
              column-gap: 2rem;
            }
          }
          
          @media (min-width: 1024px) {
            .masonry-grid {
              columns: 3;
            }
          }
          
          @media (min-width: 1280px) {
            .masonry-grid {
              columns: 4;
            }
          }
          
          .project-card {
            break-inside: avoid;
            margin-bottom: 1.5rem;
          }
          
          @media (min-width: 768px) {
            .project-card {
              margin-bottom: 2rem;
            }
          }
        `,
        }}
      />
      <div className='masonry-container py-16' ref={containerRef}>
        <div className='masonry-grid'>
          {filteredItems.map((item, index) => (
            <div
              key={`${item.name}-${current}`}
              className='project-card rounded-xl overflow-hidden group cursor-pointer'
              style={{
                background:
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
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
                        <svg
                          className='w-3 h-3 mr-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                          />
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
                        <svg
                          className='w-3 h-3 mr-1'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                        </svg>
                        Code
                      </Link>
                    )}
                  </div>

                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                      item.category === 'Frontend Only Website'
                        ? 'bg-blue-500/10 border-blue-500/30'
                        : item.category === 'Full Stack Website'
                        ? ' bg-yellow-500/10 border-yellow-500/30'
                        : item.category === 'Figma Design'
                        ? 'bg-pink-500/10 border-pink-500/30'
                        : item.category === 'Desktop App'
                        ? 'bg-purple-500/10 border-purple-500/30'
                        : ''
                    }`}
                  >
                    {item.category === 'Frontend Only Website' && (
                      <div className='flex items-center gap-1.5 text-blue-400'>
                        <Globe className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Full Stack Website' && (
                      <div className='flex items-center gap-1.5 text-yellow-400'>
                        <Zap className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Figma Design' && (
                      <div className='flex items-center gap-1.5 text-pink-400'>
                        <Palette className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Desktop App' && (
                      <div className='flex items-center gap-1.5 text-purple-400'>
                        <Monitor className='w-4 h-4' />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Masonry
