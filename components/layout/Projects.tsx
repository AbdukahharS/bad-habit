'use client'

import { useEffect, useState } from 'react'
import { Target, Globe, Zap, Palette, Monitor } from 'lucide-react'
import Masonry from '../Masonry'

type Project = {
  name: string
  description: string
  image: string
  live: string | null
  source: string | null
  tags: string[]
  category: string
}

const projects: Project[] = [
  {
    name: 'Al-Dar Rehabilitation Clinic',
    description: "I developed Frontend of Al-Dar clinic's website",
    image: 'al-dar.png',
    live: 'https://www.aldarrehabclinic.com/',
    source: 'https://github.com/AbdukahharS/al-dar-clinic',
    tags: ['Next.JS', 'Tailwind', 'Framer-motion'],
    category: 'Full Stack Website',
  },
  {
    name: 'Luminink',
    description: 'Illuminate Your Ideas, Capture Your Creativity.',
    image: 'luminink.png',
    live: 'https://luminink.vercel.app/',
    source: 'https://github.com/AbdukahharS/luminink',
    tags: [
      'Next.js',
      'Tailwind',
      'Sonner',
      'Zod',
      'Clerk',
      'Blocknote',
      'TypeScript',
    ],
    category: 'Full Stack Website',
  },
  {
    name: 'Founders Language School',
    description: 'Business website for Founders Language School.',
    image: 'founders.png',
    live: 'https://founderslc.netlify.app/',
    source: 'https://github.com/AbdukahharS/founders-mui',
    tags: ['React.js', 'Material UI', 'Firebse'],
    category: 'Full Stack Website',
  },
  {
    name: "Shahzod's Blog",
    description: 'My own blog website about application development',
    image: 'blog.png',
    live: 'https://blog.abdukahhar.uz',
    source: 'https://github.com/AbdukahharS/blog',
    tags: [
      'NextJS',
      'ShadCn UI',
      'Firebase',
      'TypeScript',
      'Clerk',
      'Blocknote',
    ],
    category: 'Full Stack Website',
  },
  {
    name: 'Agricultural statistics',
    description: 'Code snippet for presenting statistics',
    image: 'agricultural.png',
    live: 'https://agricultural-statistics.netlify.app/',
    source: 'https://github.com/AbdukahharS/agricultural-statistics',
    tags: ['ApexCharts.js'],
    category: 'Frontend Only Website',
  },
  {
    name: 'InMan',
    description: 'Inventory Management Desktop Application',
    image: 'inman.png',
    source: 'https://github.com/AbdukahharS/InMan',
    live: null,
    tags: ['Nextron', 'NextJS', 'ElectronJS', 'TypeScript', 'Shadcn UI'],
    category: 'Desktop App',
  },
  {
    name: 'AS-Company',
    description: 'Business website for AS-Company.',
    image: 'as-company.png',
    live: 'https://company-as.netlify.app/',
    source: 'https://github.com/AbdukahharS/ascompany',
    tags: ['Bootstrap', 'Ajax', 'Jquery'],
    category: 'Frontend Only Website',
  },
  {
    name: 'BilalIbnTuygun',
    description: 'Personal website for Bilal ibn Tuygun.',
    image: 'bilalibntuygun.png',
    live: 'https://bilalibntuygun.uz/',
    source: 'https://github.com/AbdukahharS/bilalibntuygun',
    tags: ['React.js', 'Styled Components'],
    category: 'Frontend Only Website',
  },
  {
    name: 'ArcGis Desktop',
    description: 'Online course preview page for ArcGis Desktop.',
    image: 'arcgis.png',
    live: 'https://arcgisdesktop.uz/',
    tags: ['FontAwesome'],
    category: 'Frontend Only Website',
    source: null,
  },
  {
    name: 'FreshGoods',
    description: 'Landing page for a business.',
    image: 'freshgoods.png',
    live: 'https://freshgoods-shop.netlify.app/',
    source: 'https://github.com/AbdukahharS/freshgoods',
    tags: [],
    category: 'Frontend Only Website',
  },
  {
    name: 'Hotel BT',
    description: 'Landing page for a hotel.',
    image: 'hbt.png',
    live: 'https://h-bt.netlify.app/',
    source: 'https://github.com/AbdukahharS/hbt',
    tags: ['FontAwesome'],
    category: 'Frontend Only Website',
  },
  {
    name: 'NS Tour',
    description: 'Business website for Nodirah-Sultan Travel Agency.',
    image: 'nstour.png',
    live: 'https://ns-tour.netlify.app',
    source: 'https://github.com/AbdukahharS/tour',
    tags: ['React.js', 'SASS', 'Firebase', 'Payme'],
    category: 'Full Stack Website',
  },
  {
    name: 'Personal Portfolio',
    description: 'Personal portfolio website tepmplate.',
    image: 'portfolio-doe.png',
    live: 'https://portfolio-doe.netlify.app/',
    source: 'https://github.com/AbdukahharS/john-doe-portfolio',
    tags: [],
    category: 'Frontend Only Website',
  },
  {
    name: 'Quotopia',
    description: 'Discover & Share Quotes',
    image: 'quotopia.png',
    live: 'https://quotopiaa.vercel.app/',
    source: 'https://github.com/AbdukahharS/quotopia',
    tags: ['Next.js', 'MongoDB', 'Mongoose', 'Tailwind'],
    category: 'Full Stack Website',
  },
  {
    name: 'Ali Abdulaziz',
    description: 'Personal website for Ali Abdulaziz.',
    image: 'ali-abdulaziz.png',
    live: 'https://ali-abdulaziz.uz/',
    source: 'https://github.com/AbdukahharS/personal-website',
    tags: ['Bootstrap'],
    category: 'Frontend Only Website',
  },
  {
    name: 'CrashCourse',
    description: 'Design for business website',
    image: 'crashcourse.png',
    live: 'https://www.figma.com/proto/wq2AKKCyGZbYWENEz4U1Pp/CrashCourse-2021?node-id=2-2&starting-point-node-id=2%3A2&mode=design&t=5snVJamAbCiZCx5W-1',
    tags: ['Figma'],
    category: 'Figma Design',
    source: null,
  },
  {
    name: 'SunnySide',
    description: 'Landing page design',
    image: 'Sunnyside.png',
    live: 'https://www.figma.com/proto/x5tmzrPqSXztS9tLIpFfJu/Sunnyside-Landing?node-id=3-4&mode=design&t=8o00bhdd9cVoXCkv-1',
    tags: ['Figma'],
    category: 'Figma Design',
    source: null,
  },
]

type Category = {
  All: number
  'Frontend Only Website': number
  'Full Stack Website': number
  'Figma Design': number
  'Desktop App': number
}

const Projects = () => {
  const [categories, setCategories] = useState<Category>({
    All: 0,
    'Frontend Only Website': 0,
    'Full Stack Website': 0,
    'Figma Design': 0,
    'Desktop App': 0,
  })
  const [current, setCurrent] = useState<
    'All' | 'Frontend Only Website' | 'Full Stack Website' | 'Figma Design'
  >('All')

  useEffect(() => {
    setCategories({
      All: 0,
      'Frontend Only Website': 0,
      'Full Stack Website': 0,
      'Figma Design': 0,
      'Desktop App': 0,
    })
    projects.forEach((project) => {
      setCategories((prev: Category) => {
        return {
          ...prev,
          All: prev.All + 1,
          [project.category as keyof Category]:
            prev[project.category as keyof Category] + 1,
        }
      })
    })
  }, [])

  return (
    <section className='w-full px-6 md:px-12 xl:px-24 mb-28' id='projects'>
      <h2 className='text-5xl sm:text-8xl font-bold mb-12 tracking-wide font-poppins px-8 sm:px-20'>
        My Projects
      </h2>
      <div className='filter py-8 flex flex-col sm:flex-row gap-6 sm:gap-4 items-start sm:items-center'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
            <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
            </svg>
          </div>
          <p className='text-lg font-semibold text-white font-poppins'>Filter Projects</p>
        </div>
        
        <div className='flex flex-wrap gap-3 sm:gap-4 max-w-full overflow-visible'>
          {Object.keys(categories).map((cat, i) => (
            <button
              className={`relative group px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap backdrop-blur-sm border ${
                current === cat 
                  ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white border-blue-400/50 shadow-lg shadow-blue-500/25 scale-105' 
                  : 'bg-gray-800/30 text-gray-300 border-gray-700/50 hover:bg-gray-700/50 hover:text-white hover:border-gray-500/50 hover:scale-105'
              }`}
              onClick={() =>
                setCurrent(
                  cat as
                    | 'All'
                    | 'Frontend Only Website'
                    | 'Full Stack Website'
                    | 'Figma Design'
                )
              }
              key={i}
            >
              <span className='relative z-10 flex items-center gap-2'>
                {cat === 'All' && <Target className='size-5' />}
                {cat === 'Frontend Only Website' && <Globe className='size-5' />}
                {cat === 'Full Stack Website' && <Zap className='size-5' />}
                {cat === 'Figma Design' && <Palette className='size-5' />}
                {cat === 'Desktop App' && <Monitor className='size-5' />}
                {cat}
              </span>
              
              <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all duration-300 ${
                current === cat 
                  ? 'bg-white text-blue-600 scale-100' 
                  : 'bg-blue-500/80 text-white scale-90 group-hover:scale-100'
              }`}>
                {categories[cat as keyof Category]}
              </div>
              
              {current !== cat && (
                <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              )}
            </button>
          ))}
        </div>
      </div>
      <Masonry items={projects} current={current} />
    </section>
  )
}

export default Projects
