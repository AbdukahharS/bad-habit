import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

type MasonryProps = {
  items: {
    name: string
    description: string
    image: string
    live: string
    source: string | null
    tags: string[]
    category: string
  }[]
  setCurrent: (
    category:
      | 'All'
      | 'Frontend Only Website'
      | 'Full Stack Website'
      | 'Figma Design'
  ) => void
  current:
    | 'All'
    | 'Frontend Only Website'
    | 'Full Stack Website'
    | 'Figma Design'
}

const Masonry: React.FC<MasonryProps> = ({ items, setCurrent, current }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const divs = containerRef.current?.children
    if (divs) {
      for (let i in divs) {
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
          style={{
            backgroundColor: 'rgba(136, 136, 136, .05)',
            transition: 'all 0.3s ease-in-out',
          }}
          className='break-inside-avoid rounded-lg overflow-hidden'
        >
          <div className='overflow-hidden'>
            <Image
              src={`/projects/${item.image}`}
              alt={`Image ${index + 1}`}
              width={600}
              height={300}
              className='w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-[1.2]'
            />
          </div>
          <div className='py-3 px-5'>
            <span className='hidden'>{item.category}</span>
            <h3 className='text-xl font-semibold mb-2'>{item.name}</h3>
            <p className='text-foreground opacity-70 text-sm'>
              {item.description}
            </p>
            <div className='flex gap-5 items-center justify-end mt-2'>
              <Link
                href={item.live}
                className='hover:opacity-70 text-blue-300  underline'
              >
                Visit
              </Link>
              {item.source && (
                <Link
                  href={item.source}
                  className='hover:opacity-70 text-blue-300  underline'
                >
                  Source
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Masonry
