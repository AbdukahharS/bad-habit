'use client'

import { useMemo, useState } from 'react'
import {
  Target,
  Globe,
  Palette,
  Monitor,
  Layers,
  Smartphone,
  ChevronDown,
  Building2,
  FileText,
  Package,
} from 'lucide-react'
import Masonry from '../Masonry'
import type { Locale, ProjectCategory } from '@/lib/i18n'

type Project = {
  name: string
  description: string
  image: string
  live: string | null
  source: string | null
  tags: string[]
  category: ProjectCategory
  highlighted?: boolean
}

type LocalizedText = Record<Locale, string>

type LocalizedProject = Omit<Project, 'description'> & {
  description: LocalizedText
}

const projectCatalog: LocalizedProject[] = [
  {
    name: 'Cirth',
    description: {
      en: 'Modern documentation hosting platform with rich text editing, version management, custom domains, and GitHub import. Built with Next.js 16 and Supabase.',
      uz: 'Boy matn tahriri, versiya boshqaruvi, maxsus domenlar va GitHub importiga ega zamonaviy hujjat joylash platformasi. Next.js 16 va Supabase asosida qurilgan.',
    },
    image: 'cirth.png',
    live: 'https://cirth.uz/',
    source: null,
    tags: [
      'Next.js',
      'TypeScript',
      'Supabase',
      'TipTap',
      'Tailwind CSS',
      'shadcn/ui',
      'Zustand',
    ],
    category: 'Full-Stack Web Apps',
    highlighted: true,
  },
  {
    name: 'Ravon Taxi - Admin Dashboard',
    description: {
      en: 'Comprehensive fleet management system with real-time trip monitoring, driver oversight, and analytics dashboard for local taxi company.',
      uz: 'Mahalliy taksi kompaniyasi uchun real vaqt safar kuzatuvi, haydovchilar nazorati va analitika paneliga ega kompleks avtopark boshqaruv tizimi.',
    },
    image: 'ravon-admin.png',
    live: null,
    source: null,
    tags: [
      'React',
      'TypeScript',
      'Zustand',
      'ShadCN UI',
      'React Hook Form',
      'Zod',
      'Axios',
    ],
    category: 'Enterprise Applications',
  },
  {
    name: 'Ravon Taxi - Driver Mobile App',
    description: {
      en: 'Cross-platform Android driver application with geolocation tracking, ride assignments, and real-time updates built with Tauri.',
      uz: 'Tauri yordamida yaratilgan, geolokatsiya kuzatuvi, buyurtma biriktirish va real vaqt yangilanishlarini qo\'llovchi kross-platforma Android haydovchi ilovasi.',
    },
    image: 'ravon-driver.jpg',
    live: null,
    source: null,
    tags: [
      'React',
      'TypeScript',
      'Tauri',
      'Zustand',
      'Geolocation',
      'Framer Motion',
    ],
    category: 'Mobile Apps',
  },
  {
    name: 'Chorvoq Tourism Zone - Government Geoportal',
    description: {
      en: 'Government tourism management platform with advanced GIS capabilities, interactive maps, and multilingual support for Chorvoq recreation zone.',
      uz: 'Chorvoq dam olish hududi uchun ilg\'or GIS imkoniyatlari, interaktiv xaritalar va ko\'p tilli qo\'llab-quvvatlashga ega davlat turizm boshqaruv platformasi.',
    },
    image: 'chorvoq.png',
    live: null,
    source: null,
    tags: [
      'React',
      'TypeScript',
      'Maplibre GL JS',
      'Leaflet',
      'OpenLayers',
      'Zustand',
      'Recharts',
      'i18n',
    ],
    category: 'Enterprise Applications',
  },
  {
    name: 'Global Crop - Farmer Monitoring Platform',
    description: {
      en: 'Banking sector agricultural monitoring platform with GIS-based field mapping, data analytics, and loan tracking for rural farmers.',
      uz: 'Bank sohasi uchun GIS asosidagi dala xaritalash, ma\'lumotlar analitikasi va kredit kuzatuviga ega qishloq xo\'jaligi monitoring platformasi.',
    },
    image: 'globalcrop.png',
    live: null,
    source: null,
    tags: [
      'React',
      'TypeScript',
      'Maplibre GL JS',
      'Leaflet',
      'Zustand',
      'Recharts',
      'i18n',
    ],
    category: 'Enterprise Applications',
  },
  {
    name: 'Global Crop - Landing Page',
    description: {
      en: 'Landing page for Global Crop agricultural monitoring platform built with React and Vite.',
      uz: 'React va Vite asosida yaratilgan Global Crop qishloq xo\'jaligi monitoring platformasi uchun landing sahifa.',
    },
    image: 'global-crop-landing.png',
    live: 'https://global-crop-landing.vercel.app/',
    source: 'https://github.com/AbdukahharS/global-crop-landing',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    category: 'Landing Pages',
  },
  {
    name: 'Yarrow Map Web SDK Documentation',
    description: {
      en: 'I made the documentation website for the Yarrow Map Web SDK.',
      uz: 'Yarrow Map Web SDK uchun hujjatlar saytini ishlab chiqdim.',
    },
    image: 'yarrow-web-sdk-docs.png',
    live: 'https://yarrow-web-sdk-docs.netlify.app/',
    source: 'https://github.com/AbdukahharS/yarrow-web-sdk-docs',
    tags: ['Vue', 'I18n', 'TypeScript'],
    category: 'Documentation',
  },
  {
    name: 'Yarrow Map Web SDK',
    description: {
      en: 'TypeScript-based mapping library built on top of MapLibre GL. Provides high-level API for interactive maps with routing, search, public transport tracking, and custom layer management.',
      uz: 'MapLibre GL ustiga qurilgan TypeScript xaritalash kutubxonasi. Marshrutlash, qidiruv, jamoat transporti kuzatuvi va maxsus layer boshqaruvi bilan yuqori darajadagi API taqdim etadi.',
    },
    image: 'yarrow-sdk.png',
    live: null,
    source: 'https://git.yarrow.uz/yarrow-sdk/frontend/yarrow-map-web-sdk',
    tags: ['TypeScript', 'MapLibre GL', 'Rollup', 'Axios'],
    category: 'Libraries',
  },
  {
    name: 'BSOK CRM',
    description: {
      en: 'Enterprise ERP and CRM application for mesh wire/net manufacturing. Features production tracking, inventory management, sales, financial tracking, and customer/worker management.',
      uz: 'To\'r va sim ishlab chiqarish uchun korporativ ERP/CRM ilovasi. Ishlab chiqarish, ombor, savdo, moliya hamda mijoz/xodim boshqaruvini qamrab oladi.',
    },
    image: 'bsok-crm.png',
    live: 'https://bsok-frontend.vercel.app/',
    source: 'https://github.com/AbdukahharS/bsok-frontend',
    tags: [
      'React',
      'TypeScript',
      'Bun',
      'Tailwind CSS',
      'shadcn/ui',
      'Zustand',
      'i18n',
    ],
    category: 'Enterprise Applications',
  },
  {
    name: 'Al-Dar Rehabilitation Clinic',
    description: {
      en: "I developed Frontend of Al-Dar clinic's website",
      uz: 'Al-Dar klinikasi sayti uchun frontend qismini ishlab chiqdim.',
    },
    image: 'al-dar.png',
    live: 'https://www.aldarrehabclinic.com/',
    source: 'https://github.com/AbdukahharS/al-dar-clinic',
    tags: ['Next.JS', 'Tailwind', 'Framer-motion'],
    category: 'Enterprise Applications',
  },
  {
    name: 'Luminink',
    description: {
      en: 'Illuminate Your Ideas, Capture Your Creativity.',
      uz: 'G\'oyalaringizni yoritib, ijodingizni namoyon eting.',
    },
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
    category: 'Full-Stack Web Apps',
  },
  {
    name: 'Founders Language School',
    description: {
      en: 'Business website for Founders Language School.',
      uz: 'Founders Language School uchun biznes veb-sayt.',
    },
    image: 'founders.png',
    live: 'https://founderslc.netlify.app/',
    source: 'https://github.com/AbdukahharS/founders-mui',
    tags: ['React.js', 'Material UI', 'Firebse'],
    category: 'Full-Stack Web Apps',
  },
  {
    name: 'Yarrow Map Web',
    description: {
      en: 'A Nuxt 3 progressive web application providing interactive mapping with search, routing, and user profile features. Integrates with Yarrow Map Web SDK for map rendering.',
      uz: 'Qidiruv, marshrutlash va foydalanuvchi profili funksiyalari bo\'lgan Nuxt 3 progressiv veb-ilova. Xarita chizish uchun Yarrow Map Web SDK bilan integratsiyalashgan.',
    },
    image: 'yarrow-map-web.png',
    live: 'https://map.yarrow.uz/',
    source: null,
    tags: [
      'Nuxt 3',
      'Vue 3',
      'Pinia',
      'i18n',
      'Axios',
      'Yarrow Map Web SDK',
      'TypeScript',
    ],
    category: 'Enterprise Applications',
  },
  {
    name: "Shahzod's Blog",
    description: {
      en: 'My own blog website about application development',
      uz: 'Dastur ishlab chiqish haqida shaxsiy blog saytim.',
    },
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
    category: 'Full-Stack Web Apps',
  },
  {
    name: 'Agricultural statistics',
    description: {
      en: 'Code snippet for presenting statistics',
      uz: 'Statistikani taqdim etish uchun kod namunasi.',
    },
    image: 'agricultural.png',
    live: 'https://agricultural-statistics.netlify.app/',
    source: 'https://github.com/AbdukahharS/agricultural-statistics',
    tags: ['ApexCharts.js'],
    category: 'Landing Pages',
  },
  {
    name: 'InMan',
    description: {
      en: 'Inventory Management Desktop Application',
      uz: 'Ombor boshqaruvi uchun desktop ilova.',
    },
    image: 'inman.png',
    source: 'https://github.com/AbdukahharS/InMan',
    live: null,
    tags: ['Nextron', 'NextJS', 'ElectronJS', 'TypeScript', 'Shadcn UI'],
    category: 'Desktop Apps',
  },
  {
    name: 'AS-Company',
    description: {
      en: 'Business website for AS-Company.',
      uz: 'AS-Company uchun biznes veb-sayt.',
    },
    image: 'as-company.png',
    live: 'https://company-as.netlify.app/',
    source: 'https://github.com/AbdukahharS/ascompany',
    tags: ['Bootstrap', 'Ajax', 'Jquery'],
    category: 'Landing Pages',
  },
  {
    name: 'BilalIbnTuygun',
    description: {
      en: 'Personal website for Bilal ibn Tuygun.',
      uz: 'Bilal ibn Tuygun uchun shaxsiy veb-sayt.',
    },
    image: 'bilalibntuygun.png',
    live: 'bilalibntuygun.netlify.app/',
    source: 'https://github.com/AbdukahharS/bilalibntuygun',
    tags: ['React.js', 'Styled Components'],
    category: 'Landing Pages',
  },
  {
    name: 'ArcGis Desktop',
    description: {
      en: 'Online course preview page for ArcGis Desktop.',
      uz: 'ArcGis Desktop uchun onlayn kurs preview sahifasi.',
    },
    image: 'arcgis.png',
    live: 'https://arcgisdesktop.uz/',
    tags: ['FontAwesome'],
    category: 'Landing Pages',
    source: null,
  },
  {
    name: 'FreshGoods',
    description: {
      en: 'Landing page for a business.',
      uz: 'Biznes uchun landing sahifa.',
    },
    image: 'freshgoods.png',
    live: 'https://freshgoods-shop.netlify.app/',
    source: 'https://github.com/AbdukahharS/freshgoods',
    tags: [],
    category: 'Landing Pages',
  },
  {
    name: 'Hotel BT',
    description: {
      en: 'Landing page for a hotel.',
      uz: 'Mehmonxona uchun landing sahifa.',
    },
    image: 'hbt.png',
    live: 'https://h-bt.netlify.app/',
    source: 'https://github.com/AbdukahharS/hbt',
    tags: ['FontAwesome'],
    category: 'Landing Pages',
  },
  {
    name: 'NS Tour',
    description: {
      en: 'Business website for Nodirah-Sultan Travel Agency.',
      uz: 'Nodirah-Sultan sayyohlik agentligi uchun biznes veb-sayt.',
    },
    image: 'nstour.png',
    live: 'https://ns-tour.netlify.app',
    source: 'https://github.com/AbdukahharS/tour',
    tags: ['React.js', 'SASS', 'Firebase', 'Payme'],
    category: 'Full-Stack Web Apps',
  },
  {
    name: 'Personal Portfolio',
    description: {
      en: 'Personal portfolio website tepmplate.',
      uz: 'Shaxsiy portfolio sayt shabloni.',
    },
    image: 'portfolio-doe.png',
    live: 'https://portfolio-doe.netlify.app/',
    source: 'https://github.com/AbdukahharS/john-doe-portfolio',
    tags: [],
    category: 'Landing Pages',
  },
  {
    name: 'Quotopia',
    description: {
      en: 'Discover & Share Quotes',
      uz: 'Iqtiboslarni kashf eting va ulashing.',
    },
    image: 'quotopia.png',
    live: 'https://quotopiaa.vercel.app/',
    source: 'https://github.com/AbdukahharS/quotopia',
    tags: ['Next.js', 'MongoDB', 'Mongoose', 'Tailwind'],
    category: 'Full-Stack Web Apps',
  },
  {
    name: 'Ali Abdulaziz',
    description: {
      en: 'Personal website for Ali Abdulaziz.',
      uz: 'Ali Abdulaziz uchun shaxsiy veb-sayt.',
    },
    image: 'ali-abdulaziz.png',
    live: 'https://ali-abdulaziz.uz/',
    source: 'https://github.com/AbdukahharS/personal-website',
    tags: ['Bootstrap'],
    category: 'Landing Pages',
  },
  {
    name: 'CrashCourse',
    description: {
      en: 'Design for business website',
      uz: 'Biznes veb-sayt dizayni.',
    },
    image: 'crashcourse.png',
    live: 'https://www.figma.com/proto/wq2AKKCyGZbYWENEz4U1Pp/CrashCourse-2021?node-id=2-2&starting-point-node-id=2%3A2&mode=design&t=5snVJamAbCiZCx5W-1',
    tags: ['Figma'],
    category: 'Design Work',
    source: null,
  },
  {
    name: 'SunnySide',
    description: {
      en: 'Landing page design',
      uz: 'Landing sahifa dizayni.',
    },
    image: 'Sunnyside.png',
    live: 'https://www.figma.com/proto/x5tmzrPqSXztS9tLIpFfJu/Sunnyside-Landing?node-id=3-4&mode=design&t=8o00bhdd9cVoXCkv-1',
    tags: ['Figma'],
    category: 'Design Work',
    source: null,
  },
]

const categoryCounts = projectCatalog.reduce((acc, project) => {
  acc.All = (acc.All || 0) + 1
  acc[project.category as keyof Omit<typeof acc, 'All'>] =
    (acc[project.category as keyof Omit<typeof acc, 'All'>] || 0) + 1
  return acc
}, {} as Record<ProjectCategory, number>)

type ProjectsProps = {
  title: string
  filterLabel: string
  liveLabel: string
  codeLabel: string
  categoryLabels: Record<ProjectCategory, string>
  locale: Locale
}

const Projects = ({
  title,
  filterLabel,
  liveLabel,
  codeLabel,
  categoryLabels,
  locale,
}: ProjectsProps) => {
  const [current, setCurrent] = useState<ProjectCategory>('All')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const projects = useMemo(
    () =>
      projectCatalog.map((project) => ({
        ...project,
        description: project.description[locale],
      })),
    [locale]
  )

  return (
    <section className='w-full px-6 md:px-12 xl:px-24 mb-28' id='projects'>
      <h2 className='text-5xl sm:text-8xl font-bold mb-12 tracking-wide font-poppins px-2 sm:px-20'>
        {title}
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
              {filterLabel}
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
            {filterLabel}
          </p>
        </div>

        <div
          className={`flex flex-wrap gap-3 p-1 sm:gap-4 max-w-full overflow-hidden transition-all duration-500 ease-in-out ${
            isFilterOpen
              ? 'max-h-[500px] opacity-100'
              : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100'
          }`}
        >
          {Object.keys(categoryCounts).map((cat, i) => (
            <button
              className={`relative group px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap backdrop-blur-sm border ${
                current === cat
                  ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white border-blue-400/50 shadow-lg shadow-blue-500/25 scale-105'
                  : 'bg-gray-800/30 text-gray-300 border-gray-700/50 hover:bg-gray-700/50 hover:text-white hover:border-gray-500/50 hover:scale-105'
              }`}
              onClick={() => setCurrent(cat as ProjectCategory)}
              key={i}
            >
              <span className='relative z-10 flex items-center gap-2'>
                {cat === 'All' && <Target className='size-5' />}
                {cat === 'Enterprise Applications' && (
                  <Building2 className='size-5' />
                )}
                {cat === 'Mobile Apps' && <Smartphone className='size-5' />}
                {cat === 'Desktop Apps' && <Monitor className='size-5' />}
                {cat === 'Full-Stack Web Apps' && <Layers className='size-5' />}
                {cat === 'Landing Pages' && <Globe className='size-5' />}
                {cat === 'Documentation' && <FileText className='size-5' />}
                {cat === 'Design Work' && <Palette className='size-5' />}
                {cat === 'Libraries' && <Package className='size-5' />}
                {categoryLabels[cat as ProjectCategory]}
              </span>

              <div
                className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all duration-300 ${
                  current === cat
                    ? 'bg-white text-blue-600 scale-100'
                    : 'bg-blue-500/80 text-white scale-90 group-hover:scale-100'
                }`}
              >
                {categoryCounts[cat as keyof typeof categoryCounts]}
              </div>

              {current !== cat && (
                <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              )}
            </button>
          ))}
        </div>
      </div>
      <Masonry
        items={projects}
        current={current}
        liveLabel={liveLabel}
        codeLabel={codeLabel}
      />
    </section>
  )
}

export default Projects
