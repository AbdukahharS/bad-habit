'use client'

import { useEffect, useState } from 'react'
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
    live: 'https://al-dar-clinic.vercel.app',
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
    live: 'https://nstour.uz/',
    source: 'https://github.com/AbdukahharS/tou',
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
    image: 'sunnyside.png',
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
      <div className='filter py-2 flex flex-row gap-6 sm:gap-8 items-center text-slate-200 font-semibold max-w-full overflow-x-auto'>
        <p className='text-lg hidden sm:block'>Filter by:</p>
        {Object.keys(categories).map((cat, i) => (
          <button
            className={
              'transition-colors duration-200 relative group hover:text-blue-400 text-lg whitespace-nowrap ' +
              (current === cat ? 'text-blue-500' : '')
            }
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
            {cat}
            <small className='absolute group-hover:text-blue-400 transition-colors duration-200 top-0 right-0 translate-x-full -translate-y-[40%] font-normal'>
              {categories[cat as keyof Category]}
            </small>
          </button>
        ))}
      </div>
      <Masonry items={projects} current={current} />
    </section>
  )
}

export default Projects
