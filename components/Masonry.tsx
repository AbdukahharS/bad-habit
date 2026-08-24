import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  IconWorld,
  IconPalette,
  IconDeviceDesktop,
  IconStack2,
  IconDeviceMobile,
  IconBuildingSkyscraper,
  IconFileText,
  IconPackage,
  IconStar,
  IconArrowUpRight,
  IconBrandGithub,
} from '@tabler/icons-react'
import type { ProjectCategory } from '@/lib/i18n'
import { TagChip } from '@/components/icons/tags'

type MasonryItem = {
  name: string
  description: string
  image: string
  live: string | null
  source: string | null
  tags: string[]
  category: ProjectCategory
  highlighted?: boolean
  badge?: string
  packageRegistry?: string | null
}

type MasonryProps = {
  items: MasonryItem[]
  liveLabel: string
  codeLabel: string
  packageLabel: string
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  liveLabel,
  codeLabel,
  packageLabel,
}) => {
  return (
    <div className='masonry-container py-8'>
      <div className='masonry-grid'>
        {items.map((item, index) => {
          const card = (
            <div
              className={`project-card rounded-xl overflow-hidden group${item.highlighted ? ' highlighted' : ''}`}
              style={
                item.highlighted
                  ? undefined
                  : { animationDelay: `${index * 0.1}s` }
              }
            >
              <div className='relative overflow-hidden rounded-t-xl'>
                <Image
                  src={`/projects/${item.image}`}
                  alt={`${item.name} project screenshot`}
                  width={600}
                  height={300}
                  sizes='(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                  className='w-full h-auto transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110'
                />
                <div className='absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                {item.badge && (
                  <div className='absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-linear-to-br from-amber-400/20 via-white/10 to-amber-400/20 backdrop-blur-sm border border-amber-400/30'>
                    <IconStar className='w-3.5 h-3.5 text-amber-400 fill-amber-400 drop-shadow-lg' />
                    <span className='text-xs font-semibold text-amber-300 drop-shadow-md'>
                      {item.badge}
                    </span>
                  </div>
                )}
              </div>

              <div className='p-6 space-y-4 transition-all duration-300 group-hover:translate-y-0.5'>
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
                    {item.tags.slice(0, 3).map((tag) => (
                      <TagChip key={tag} slug={tag} size='sm' />
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
                        <IconArrowUpRight className='w-3.5 h-3.5 mr-1' />
                        {liveLabel}
                      </Link>
                    )}
                    {item.source && (
                      <Link
                        href={item.source}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center px-3 py-2 text-xs font-semibold text-gray-300 bg-gray-800/80 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25'
                      >
                        <IconBrandGithub className='w-3.5 h-3.5 mr-1' />
                        {codeLabel}
                      </Link>
                    )}
                    {item.packageRegistry && (
                      <Link
                        href={item.packageRegistry}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center px-3 py-2 text-xs font-semibold text-orange-300 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg transition-all duration-300 hover:scale-105 border border-orange-500/30'
                      >
                        <IconPackage className='w-3.5 h-3.5 mr-1' />
                        {packageLabel}
                      </Link>
                    )}
                  </div>

                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm border transition-all duration-300 group-hover:scale-105 ${
                      item.highlighted
                        ? 'bg-white/10 border-white/20'
                        : item.category === 'Enterprise Applications'
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
                                      : item.category === 'Dev Tools/Utils'
                                        ? 'bg-rose-500/10 border-rose-500/30 group-hover:bg-rose-500/20 group-hover:border-rose-400/50'
                                        : ''
                    }`}
                  >
                    {item.category === 'Enterprise Applications' && (
                      <div
                        className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-cyan-400'}`}
                      >
                        <IconBuildingSkyscraper className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Mobile Apps' && (
                      <div
                        className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-green-400'}`}
                      >
                        <IconDeviceMobile className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Desktop Apps' && (
                      <div
                        className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-purple-400'}`}
                      >
                        <IconDeviceDesktop className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Full-Stack Web Apps' && (
                      <div
                        className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-indigo-400'}`}
                      >
                        <IconStack2 className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Landing Pages' && (
                      <div
                        className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-blue-400'}`}
                      >
                        <IconWorld className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Documentation' && (
                      <div
                        className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-emerald-400'}`}
                      >
                        <IconFileText className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Design Work' && (
                      <div
                        className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-pink-400'}`}
                      >
                        <IconPalette className='w-4 h-4' />
                      </div>
                    )}
                    {item.category === 'Dev Tools/Utils' && (
                      <div
                        className={`flex items-center gap-1.5 ${item.highlighted ? 'text-white/80' : 'text-rose-400'}`}
                      >
                        <IconPackage className='w-4 h-4' />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )

          if (item.highlighted) {
            return (
              <div
                key={item.name}
                className='project-card-highlight-frame'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {card}
              </div>
            )
          }

          return React.cloneElement(card, { key: item.name })
        })}
      </div>
    </div>
  )
}

export default Masonry
