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
import rawCatalog from '@/lib/data/projects.json'

type Project = {
  name: string
  description: string
  image: string
  live: string | null
  source: string | null
  tags: string[]
  category: ProjectCategory
  highlighted?: boolean
  packageRegistry?: string | null
}

type LocalizedText = Record<Locale, string>

type LocalizedProject = Omit<Project, 'description'> & {
  description: LocalizedText
}

const projectCatalog: LocalizedProject[] = (rawCatalog as unknown as Array<
  Omit<LocalizedProject, 'description'> & {
    description: { en: string; uz: string; llm: string }
    llmDetails?: Record<string, string>
  }
>).map((p) => ({
  ...p,
  description: { en: p.description.en, uz: p.description.uz },
}))

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
  packageLabel: string
  categoryLabels: Record<ProjectCategory, string>
  locale: Locale
}

const Projects = ({
  title,
  filterLabel,
  liveLabel,
  codeLabel,
  packageLabel,
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
          className='flex items-center justify-between gap-3 sm:hidden w-full px-4 py-3 rounded-xl bg-linear-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300'
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
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
          <div className='w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
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
              ? 'max-h-125 opacity-100'
              : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100'
          }`}
        >
          {Object.keys(categoryCounts).map((cat, i) => (
            <button
              className={`relative group pl-2 md:pl-3 pr-3 md:pr-4 py-1 md:py-2 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap backdrop-blur-sm border ${
                current === cat
                  ? 'bg-linear-to-r from-blue-600/80 to-purple-600/80 text-white border-blue-400/50 shadow-lg shadow-blue-500/25 scale-105'
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
                className={`absolute -top-1.5 -right-2 w-4 h-4 md:w-5 md:h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-all duration-300 ${
                  current === cat
                    ? 'bg-white text-blue-600 scale-100'
                    : 'bg-blue-500/80 text-white scale-90 group-hover:scale-100'
                }`}
              >
                {categoryCounts[cat as keyof typeof categoryCounts]}
              </div>

              {current !== cat && (
                <div className='absolute inset-0 rounded-xl bg-linear-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
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
        packageLabel={packageLabel}
      />
    </section>
  )
}

export default Projects
