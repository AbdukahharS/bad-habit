import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { Globe, Palette, Monitor, Layers, Smartphone, Building2, FileText, Package, Star } from 'lucide-react'

type MasonryProps = {
  items: {
    name: string
    description: string
    image: string
    live: string | null
    source: string | null
    tags: string[]
    category: string
    highlighted?: boolean
  }[]
  current:
    | 'All'
    | 'Enterprise Applications'
    | 'Mobile Apps'
    | 'Desktop Apps'
    | 'Full-Stack Web Apps'
    | 'Landing Pages'
    | 'Documentation'
    | 'Design Work'
    | 'Libraries'
}

const Masonry: React.FC<MasonryProps> = ({ items, current }) => {
  // Get filtered items
  const filteredItems = useMemo(() => {
    return items.filter(
      (item) => current === 'All' || item.category === current
    )
  }, [items, current])

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
            box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25), 
                        0 0 0 1px rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
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

          .project-card.highlighted {
            break-inside: avoid;
            margin-bottom: 2rem;
            position: relative;
          }

          .project-card.highlighted::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: calc(0.75rem + 2px);
            background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
            background-size: 400% 400%;
            animation: gradient-shift 4s ease infinite;
            z-index: -1;
            opacity: 0.8;
          }

          .project-card.highlighted::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: calc(0.75rem + 2px);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 50%, rgba(236, 72, 153, 0.15) 100%);
            z-index: -1;
          }

          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @media (min-width: 768px) {
            .project-card {
              margin-bottom: 2rem;
            }

            .project-card.highlighted {
              grid-column: span 2;
            }
          }

          @media (min-width: 1024px) {
            .project-card.highlighted {
              grid-column: span 2;
            }
          }

          @media (min-width: 1280px) {
            .project-card.highlighted {
              grid-column: span 2;
            }
          }
        `,
        }}
      />
      <div className='masonry-container py-16'>
        <div className='masonry-grid'>
          {filteredItems.map((item, index) => (
            <div
              key={`${item.name}-${current}`}
              className={`project-card rounded-xl overflow-hidden group${item.highlighted ? ' highlighted' : ''}`}
              style={{
                background:
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                animationDelay: `${index * 0.1}s`,
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
                {item.highlighted && (
                  <div className='absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-br from-amber-400/20 via-white/10 to-amber-400/20 backdrop-blur-sm border border-amber-400/30'>
                    <Star className='w-3.5 h-3.5 text-amber-400 fill-amber-400 drop-shadow-lg' />
                    <span className='text-xs font-semibold text-amber-300 drop-shadow-md'>SaaS</span>
                  </div>
                )}
              </div>

              <div className='p-6 space-y-4 transition-all duration-300 group-hover:translate-y-[-2px]'>
                <div className='space-y-3'>
                  <h3 className='text-xl font-bold text-white transition-all duration-300 font-poppins group-hover:text-blue-300'>
                    {item.name}
                  </h3>
                  <p className='text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-300'>
                    {item.description}
                  </p>
                </div>

                {item.tags.length > 0 && (
                  <div className='flex flex-wrap gap-2 pt-2'>
                    {item.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className='px-2 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm transition-all duration-300'
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className='px-2 py-1 text-xs font-medium rounded-full bg-white/10 text-white/60 border border-white/20'>
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className='flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300'>
                  <div className='flex gap-3'>
                    {item.live && (
                      <Link
                        href={item.live}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center px-3 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-105 border border-white/20'
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
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group-hover:scale-105 ${item.highlighted ? 'bg-white/10 border-white/20' :
                      item.category === 'Enterprise Applications'
                        ? 'bg-cyan-500/10 border-cyan-500/30 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50'
                        : item.category === 'Mobile Apps'
                        ? 'bg-green-500/10 border-green-500/30 group-hover:bg-green-500/20 group-hover:border-green-400/50'
                        : item.category === 'Desktop Apps'
                        ? 'bg-purple-500/10 border-purple-500/30 group-hover:bg-purple-500/20 group-hover:border-purple-400/50'
                        : item.category === 'Full-Stack Web Apps'
                        ? 'bg-indigo-500/10 border-indigo-500/30 group-hover:bg-indigo-500/20 group-hover:border-indigo-400/50'
                        : item.category === 'Landing Pages'
                        ? 'bg-blue-500/10 border-blue-500/30 group-hover:bg-blue-500/20 group-hover:border-blue-400/50'
                        : item.category === 'Documentation'
                        ? 'bg-emerald-500/10 border-emerald-500/30 group-hover:bg-emerald-500/20 group-hover:border-emerald-400/50'
                        : item.category === 'Design Work'
                        ? 'bg-pink-500/10 border-pink-500/30 group-hover:bg-pink-500/20 group-hover:border-pink-400/50'
                        : item.category === 'Libraries'
                        ? 'bg-rose-500/10 border-rose-500/30 group-hover:bg-rose-500/20 group-hover:border-rose-400/50'
                        : ''
                    }`}
                  >
                    {item.category === 'Enterprise Applications' && (
                      <div className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-cyan-400'}`}>
                        <Building2 className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Mobile Apps' && (
                      <div className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-green-400'}`}>
                        <Smartphone className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Desktop Apps' && (
                      <div className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-purple-400'}`}>
                        <Monitor className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Full-Stack Web Apps' && (
                      <div className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-indigo-400'}`}>
                        <Layers className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Landing Pages' && (
                      <div className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-blue-400'}`}>
                        <Globe className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Documentation' && (
                      <div className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-emerald-400'}`}>
                        <FileText className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Design Work' && (
                      <div className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-pink-400'}`}>
                        <Palette className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Libraries' && (
                      <div className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-rose-400'}`}>
                        <Package className='w-4 h-4' />
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
