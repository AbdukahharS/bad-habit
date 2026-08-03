import type { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'
import { notFound } from 'next/navigation'

import Footer from '@/components/layout/Footer'
import ProjectsGallery from '@/components/layout/ProjectsGallery'
import {
  SITE_URL,
  getDictionary,
  isValidLocale,
  locales,
  type Locale,
} from '@/lib/i18n'
import { localizeProjects } from '@/lib/projects'

type Props = {
  params: Promise<{ locale: string }>
}

export const dynamic = 'force-static'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params
  if (!isValidLocale(localeParam)) return {}

  const locale = localeParam as Locale
  const dict = getDictionary(locale)
  const url = `${SITE_URL}/${locale}/projects`

  return {
    title: `${dict.projects.allProjectsTitle} — ${dict.meta.title}`,
    description: dict.projects.allProjectsSubtitle,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/projects`,
        uz: `${SITE_URL}/uz/projects`,
      },
    },
    openGraph: {
      title: `${dict.projects.allProjectsTitle} — ${dict.meta.title}`,
      description: dict.projects.allProjectsSubtitle,
      url,
    },
  }
}

export default async function ProjectsPage({ params }: Props) {
  const { locale: localeParam } = await params
  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const dict = getDictionary(locale)
  const projects = localizeProjects(locale)

  return (
    <main>
      <section className='w-full px-6 md:px-12 xl:px-24 pt-32 pb-0'>
        <Link
          href={`/${locale}#projects`}
          className='inline-flex items-center gap-2 text-sm text-white/35 hover:text-white/70 mb-10 transition-colors group'
        >
          <IconArrowLeft className='w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1' />
          {dict.projects.back}
        </Link>
        <div className='flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]'>
          <h1 className='text-6xl sm:text-7xl xl:text-[6.5rem] font-black tracking-tight font-poppins leading-[0.92] text-white'>
            {dict.projects.allProjectsTitle}
          </h1>
          <p className='text-sm text-white/40 max-w-xs xl:text-right xl:pb-1 leading-relaxed shrink-0'>
            {dict.projects.allProjectsSubtitle}
          </p>
        </div>
      </section>
      <ProjectsGallery
        projects={projects}
        labels={{
          liveLabel: dict.projects.live,
          codeLabel: dict.projects.code,
          packageLabel: dict.projects.package,
          tagFilterLabel: dict.projects.tagFilterLabel,
          clearFilters: dict.projects.clearFilters,
          noResults: dict.projects.noResults,
          selectedCount: dict.projects.selectedCount,
          matchAllTags: dict.projects.matchAllTags,
          categoryLabels: dict.categories,
        }}
      />
      <Footer
        title={dict.footer.title}
        description={dict.footer.description}
        emailLabel={dict.footer.email}
        locale={locale}
      />
    </main>
  )
}
