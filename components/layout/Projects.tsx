import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { localizeProjects } from '@/lib/projects'
import Masonry from '../Masonry'

type ProjectsProps = {
  title: string
  liveLabel: string
  codeLabel: string
  packageLabel: string
  viewAllLabel: string
  locale: Locale
}

const Projects = ({
  title,
  liveLabel,
  codeLabel,
  packageLabel,
  viewAllLabel,
  locale,
}: ProjectsProps) => {
  const projects = localizeProjects(locale).filter((p) => p.showOnHome)

  return (
    <section
      className='w-full px-6 md:px-12 xl:px-24 py-16 md:py-24 scroll-mt-24'
      id='projects'
    >
      <h2 className='text-5xl sm:text-8xl font-bold mb-12 tracking-wide font-poppins px-2 sm:px-20'>
        {title}
      </h2>
      <Masonry
        items={projects}
        liveLabel={liveLabel}
        codeLabel={codeLabel}
        packageLabel={packageLabel}
      />
      <div className='flex justify-center mt-4'>
        <Link
          href={`/${locale}/projects`}
          className='group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-linear-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-500 hover:to-purple-500 text-white font-semibold border border-blue-400/40 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40'
        >
          <span>{viewAllLabel}</span>
          <IconArrowRight className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1' />
        </Link>
      </div>
    </section>
  )
}

export default Projects
