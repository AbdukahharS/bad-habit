/// <reference types='react/canary' />

import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ViewTransition } from 'react'

import CursorFollower from '@/components/CursorFollower'
import Navbar from '@/components/layout/Navbar'
import projects from '@/lib/data/projects.json'
import {
  getDictionary,
  isValidLocale,
  type Locale,
  locales,
  SITE_URL,
} from '@/lib/i18n'
import '../globals.css'

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shahzod Abdukahhar',
  url: 'https://abdukahhar.uz',
  email: 'shahzod@abdukahhar.uz',
  jobTitle: 'Software Engineer',
  description:
    'Software Engineer and Web Developer based in Tashkent, Uzbekistan with 4+ years of experience in React, Next.js, Vue, Node.js, and full-stack development.',
  sameAs: [
    'https://linkedin.com/in/shahzod-kahhorov/',
    'https://github.com/AbdukahharS',
    'https://blog.abdukahhar.uz',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'Vue',
    'TypeScript',
    'Node.js',
    'Bun',
    'Flutter',
    'MapLibre GL',
    'Electron.js',
    'Tauri',
  ],
}

const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Projects by Shahzod Abdukahhar',
  url: 'https://abdukahhar.uz',
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'SoftwareApplication',
      name: project.name,
      description: project.description.en,
      image: `https://abdukahhar.uz/projects/${project.image}`,
      ...(project.live ? { url: project.live } : {}),
      applicationCategory: project.category,
      keywords: project.tags.join(', '),
    },
  })),
}

function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export const dynamicParams = false

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params
  if (!isValidLocale(localeParam)) {
    return {}
  }

  const locale = localeParam as Locale
  const dict = getDictionary(locale)
  const localizedPath = `${SITE_URL}/${locale}`

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    robots: 'index, follow',
    alternates: {
      canonical: localizedPath,
      languages: {
        en: `${SITE_URL}/en`,
        uz: `${SITE_URL}/uz`,
        'x-default': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: dict.meta.siteName,
      locale: dict.meta.openGraphLocale,
      images: [`${SITE_URL}/link-preview.jpg`],
      url: localizedPath,
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params
  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const dict = getDictionary(locale)

  return (
    <html lang={locale} data-scroll-behavior='smooth'>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: jsonLd(personSchema) }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: jsonLd(projectsSchema) }}
        />
      </head>
      <body
        className={`${robotoMono.className} antialiased bg-background overflow-x-hidden`}
      >
        <ViewTransition default='page-swap'>
          <CursorFollower />
          <Navbar locale={locale} navLabels={dict.nav} />
          {children}
        </ViewTransition>
      </body>
    </html>
  )
}
