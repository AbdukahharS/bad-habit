'use client'

import { useState, useEffect } from 'react'
import { MapPin, Minus, Plus, ExternalLink, Calendar, Briefcase } from 'lucide-react'
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

  // Add staggered animation on mount
  useEffect(() => {
    const cards = document.querySelectorAll('.experience-card')
    cards.forEach((card, index) => {
      const element = card as HTMLElement
      element.style.animationDelay = `${index * 0.2}s`
    })
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes experienceEnter {
            0% {
              opacity: 0;
              transform: translateY(40px) scale(0.95);
              filter: blur(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
          
          .experience-card {
            animation: experienceEnter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          }
        `
      }} />
      
      <section id='experience' className='px-6 md:px-12 xl:px-24'>
        <div className='text-center mb-16'>
          <div className='flex items-center justify-center gap-4 mb-6'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
              <Briefcase className='w-6 h-6 text-white' />
            </div>
            <h2 className='text-4xl sm:text-7xl font-bold text-white font-poppins tracking-wide'>
              Experience
            </h2>
          </div>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
            My professional journey building innovative web solutions
          </p>
        </div>
        
        <div className='flex flex-col gap-8 max-w-4xl w-full mx-auto'>
          {experiences.map((experience, index) => (
            <div className='experience-card w-full group' key={index}>
              <div
                className='relative rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-purple-400/30'
                style={{
                  background: index === 0 
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)' 
                    : 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
                }}
              >
                {/* Header */}
                <button
                  className='w-full flex justify-between items-center p-4 sm:p-6 text-left group-hover:bg-white/5 transition-all duration-300'
                  onClick={() => handleClick(experience.id)}
                >
                  <div className='flex-1 space-y-3'>
                    <div className='flex items-center gap-4 flex-wrap'>
                      <h3 className='text-xl sm:text-2xl font-bold text-white font-poppins group-hover:text-blue-300 transition-colors duration-300'>
                        {experience.title}
                      </h3>
                      <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30'>
                        <Calendar className='w-4 h-4' />
                        <span className='text-sm font-medium'>{experience.duration}</span>
                      </div>
                    </div>
                    
                    <div className='flex items-center gap-6 text-gray-300'>
                      <div className='flex items-center gap-2'>
                        <MapPin className='w-4 h-4 text-purple-400' />
                        <span className='text-sm font-medium'>{experience.location}</span>
                      </div>
                      {experience.link && (
                        <Link
                          href={experience.link.url}
                          target='_blank'
                          className='flex items-center gap-2 group/link hover:text-blue-400 transition-colors duration-300'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className='w-4 h-4' />
                          <span className='text-sm font-medium underline'>{experience.link.label}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  <div className='sm:ml-4'>
                    <div className={`flex items-center justify-center rounded-full w-12 h-12 border transition-all duration-300 ${
                      opens.includes(experience.id) 
                        ? 'bg-purple-500/20 border-purple-400/50 text-purple-300 rotate-180' 
                        : 'bg-white/5 border-white/20 text-gray-400 hover:bg-purple-500/20 hover:border-purple-400/50 hover:text-purple-300'
                    }`}>
                      {opens.includes(experience.id) ? <Minus className='w-5 h-5' /> : <Plus className='w-5 h-5' />}
                    </div>
                  </div>
                </button>

                {/* Expandable Content */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    opens.includes(experience.id) ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className='px-6 sm:px-8 pb-6 sm:pb-8 border-t border-white/10'>
                    <div className='flex flex-col lg:flex-row gap-8 pt-6'>
                      <div className='flex-1 space-y-6'>
                        <p className='text-gray-300 leading-relaxed text-lg'>
                          {experience.description}
                        </p>
                        
                        <div className='space-y-3'>
                          <h4 className='text-sm font-semibold text-white uppercase tracking-wide'>Technologies & Tools</h4>
                          <div className='flex flex-wrap gap-2'>
                            {experience.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className='px-3 py-1 text-sm font-medium rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm hover:bg-purple-500/30 transition-colors duration-300'
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {experience.logo && (
                        <div className='flex items-center justify-center lg:justify-end'>
                          <div className='w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 flex items-center justify-center'>
                            <Image 
                              src={`/employers/${experience.logo}`} 
                              width={80} 
                              height={80} 
                              alt={`${experience.title} logo`}
                              className='w-full h-full object-contain opacity-90'
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Experience
