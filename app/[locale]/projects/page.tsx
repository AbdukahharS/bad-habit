import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
      <section className='w-full px-6 md:px-12 xl:px-24 pt-32 pb-4'>
        <Link
          href={`/${locale}#projects`}
          className='inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors'
        >
          <ArrowLeft className='w-4 h-4' />
          {dict.projects.back}
        </Link>
        <h1 className='text-5xl sm:text-7xl font-bold tracking-wide font-poppins mb-4'>
          {dict.projects.allProjectsTitle}
        </h1>
        <p className='text-lg text-white/70 max-w-3xl'>
          {dict.projects.allProjectsSubtitle}
        </p>
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
