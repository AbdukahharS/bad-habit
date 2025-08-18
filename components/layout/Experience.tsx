'use client'

import { useState } from 'react'
import { MapPin, Minus, Plus, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const experiences = [
  {
    title: 'Web Developer @ Cell Power',
    description:
      'Developing frontend of Yarrow Map and commercial Web SDK for using Yarrow Map.',
    location: 'Tashkent, Uzbekistan',
    link: {
      label: 'cellpower.uz',
      url: 'https://cellpower.uz',
    },
    logo: 'cell-power.svg',
    duration: '2025 - Present',
    tags: [
      'Vue 3',
      'SDK development',
      'Maplibre GL JS',
      'JavaScript',
      'TypeScript',
      'React',
    ],
    id: 1,
  },
  {
    title: 'Freelancer',
    description:
      'Developing dynamic and static websites and designing templates based on orders from around the world.',
    location: 'Remote',
    duration: '2021 - Present',
    tags: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'NodeJS',
      'Figma',
      'Wordpress',
    ],
    id: 2,
  },
]

const Experience = () => {
  const [opens, setOpens] = useState<number[]>([1])

  const handleClick = (id: number) => {
    if (opens.includes(id)) {
      setOpens((prev) => prev.filter((item) => item !== id))
    } else {
      setOpens((prev) => [...prev, id])
    }
  }

  return (
    <section id='experience' className='px-4'>
      <h2 className='text-4xl sm:text-6xl font-bold text-center mb-12'>
        Professional Experience
      </h2>
      <div className='flex flex-col gap-6 max-w-[750px] w-full mx-auto'>
        {experiences.map((experience, index) => (
          <div className='w-full' key={index}>
            <button
              className='w-full flex justify-between items-center py-4 px-8 bg-blue-700/50 rounded-lg'
              onClick={() => handleClick(experience.id)}
            >
              <h3 className='text-xl font-semibold'>{experience.title}</h3>
              <div className='flex items-center gap-6'>
                <span className='font-semibold hidden sm:block'>
                  {experience.duration}
                </span>
                <div className='flex items-center justify-center rounded-full w-10 h-10 hover:bg-purple-500/70 transition-colors duration-300'>
                  {opens.includes(experience.id) ? <Minus /> : <Plus />}
                </div>
              </div>
            </button>

            <div
              className={`bg-blue-900/40 rounded-lg px-6 transition-all duration-500 overflow-y-hidden linear flex flex-row gap-10 ${
                opens.includes(experience.id) ? 'h-fit py-4 mt-3' : 'h-0 py-0'
              }`}
            >
              <div className='flex-1'>
                <div className='flex flex-row items-center gap-6'>
                  <div className='flex items-center mb-2 gap-2'>
                    <MapPin className='text-purple-600' />
                    <span>{experience.location}</span>
                  </div>
                  {experience.link && (
                    <Link
                      href={experience.link.url}
                      target='_blank'
                      className='flex items-center mb-2 gap-2 group'
                    >
                      <ExternalLink className='text-purple-600' />
                      <span className='group-hover:text-purple-400 transition-colors duration-200'>
                        {experience.link.label}
                      </span>
                    </Link>
                  )}
                </div>
                <p className='text-left'>{experience.description}</p>
                <div className='flex flex-wrap gap-2 mt-4'>
                  {experience.tags.map((tag, index) => (
                    <div
                      className='bg-purple-800/70 py-1 px-2 rounded-lg break-inside-avoid text-sm'
                      key={index}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              {experience.logo && (
                <Image src={`/employers/${experience.logo}`} width={120} height={120} alt='' />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
