'use client'

import { useEffect, useState } from 'react'
import { Target, Globe, Zap, Palette, Monitor, Layers, Smartphone, ChevronDown } from 'lucide-react'
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
    name: 'Ravon Taxi - Admin Dashboard',
    description: 'Comprehensive fleet management system with real-time trip monitoring, driver oversight, and analytics dashboard for local taxi company.',
    image: 'ravon-admin.png',
    live: null,
    source: null,
    tags: ['React', 'TypeScript', 'Zustand', 'ShadCN UI', 'React Hook Form', 'Zod', 'Axios'],
    category: 'Web Application',
  },
  {
    name: 'Ravon Taxi - Driver Mobile App',
    description: 'Cross-platform Android driver application with geolocation tracking, ride assignments, and real-time updates built with Tauri.',
    image: 'ravon-driver.jpg',
    live: null,
    source: null,
    tags: ['React', 'TypeScript', 'Tauri', 'Zustand', 'Geolocation', 'Framer Motion'],
    category: 'Mobile App',
  },
  {
    name: 'Chorvoq Tourism Zone - Government Geoportal',
    description: 'Government tourism management platform with advanced GIS capabilities, interactive maps, and multilingual support for Chorvoq recreation zone.',
    image: 'chorvoq.png',
    live: null,
    source: null,
    tags: ['React', 'TypeScript', 'Maplibre GL JS', 'Leaflet', 'OpenLayers', 'Zustand', 'Recharts', 'i18n'],
    category: 'Web Application',
  },
  {
    name: 'Global Crop - Farmer Monitoring Platform',
    description: 'Banking sector agricultural monitoring platform with GIS-based field mapping, data analytics, and loan tracking for rural farmers.',
    image: 'globalcrop.png',
    live: null,
    source: null,
    tags: ['React', 'TypeScript', 'Maplibre GL JS', 'Leaflet', 'Zustand', 'Recharts', 'i18n'],
    category: 'Web Application',
  },
  {
    name: 'Yarrow Map Web SDK Documentation',
    description: 'I made the documentation website for the Yarrow Map Web SDK.',
    image: 'yarrow-web-sdk-docs.png',
    live: 'https://yarrow-web-sdk-docs.netlify.app/',
    source: 'https://github.com/AbdukahharS/yarrow-web-sdk-docs',
    tags: ['Vue', 'I18n', 'TypeScript'],
    category: 'Frontend Only Website',
  },
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
    name: 'Yarrow Map Web',
    description: 'I co-developed frontend of the Yarrow Map Web application.',
    image: 'yarrow-map-web.png',
    live: 'https://map.yarrow.uz/',
    source: null,
    tags: ['Vue', 'Yarrow Map Web SDK', 'I18n', 'Pinia'],
    category: 'Frontend Only Website',
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
  'Web Application': number
  'Mobile App': number
  'Full Stack Website': number
  'Frontend Only Website': number
  'Desktop App': number
  'Figma Design': number
}

const Projects = () => {
  const [categories, setCategories] = useState<Category>({
    All: 0,
    'Web Application': 0,
    'Mobile App': 0,
    'Full Stack Website': 0,
    'Frontend Only Website': 0,
    'Desktop App': 0,
    'Figma Design': 0,
  })
  const [current, setCurrent] = useState<
    'All' | 'Web Application' | 'Mobile App' | 'Full Stack Website' | 'Frontend Only Website' | 'Desktop App' | 'Figma Design'
  >('All')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    setCategories({
      All: 0,
      'Web Application': 0,
      'Mobile App': 0,
      'Full Stack Website': 0,
      'Frontend Only Website': 0,
      'Desktop App': 0,
      'Figma Design': 0,
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
      <h2 className='text-5xl sm:text-8xl font-bold mb-12 tracking-wide font-poppins px-2 sm:px-20'>
        My Projects
      </h2>
      <div className='filter flex flex-col gap-2'>
        <button
          className='flex items-center justify-between gap-3 sm:hidden w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300'
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
              <svg
                className='w-4 h-4 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                />
              </svg>
            </div>
            <p className='text-lg font-semibold text-white font-poppins'>
              Filter Projects
            </p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-white transition-transform duration-300 ${
              isFilterOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <div className='hidden sm:flex items-center gap-3 mb-2'>
          <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
            <svg
              className='w-4 h-4 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
              />
            </svg>
          </div>
          <p className='text-lg font-semibold text-white font-poppins'>
            Filter Projects
          </p>
        </div>

        <div className={`flex flex-wrap gap-3 p-1 sm:gap-4 max-w-full overflow-hidden transition-all duration-500 ease-in-out ${
          isFilterOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100'
        }`}>
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
                    | 'Web Application'
                    | 'Mobile App'
                    | 'Full Stack Website'
                    | 'Frontend Only Website'
                    | 'Desktop App'
                    | 'Figma Design'
                )
              }
              key={i}
            >
              <span className='relative z-10 flex items-center gap-2'>
                {cat === 'All' && <Target className='size-5' />}
                {cat === 'Web Application' && <Layers className='size-5' />}
                {cat === 'Mobile App' && <Smartphone className='size-5' />}
                {cat === 'Frontend Only Website' && (
                  <Globe className='size-5' />
                )}
                {cat === 'Full Stack Website' && <Zap className='size-5' />}
                {cat === 'Figma Design' && <Palette className='size-5' />}
                {cat === 'Desktop App' && <Monitor className='size-5' />}
                {cat}
              </span>

              <div
                className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all duration-300 ${
                  current === cat
                    ? 'bg-white text-blue-600 scale-100'
                    : 'bg-blue-500/80 text-white scale-90 group-hover:scale-100'
                }`}
              >
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
