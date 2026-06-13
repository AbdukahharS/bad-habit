import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import CursorFollower from '@/components/CursorFollower'
import Navbar from '@/components/layout/Navbar'
import {
  SITE_URL,
  getDictionary,
  isValidLocale,
  locales,
  type Locale,
} from '@/lib/i18n'

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
  const localizedPath = locale === 'en' ? SITE_URL : `${SITE_URL}/${locale}`

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    robots: 'index, follow',
    alternates: {
      canonical: localizedPath,
      languages: {
        en: SITE_URL,
        uz: `${SITE_URL}/uz`,
        'x-default': SITE_URL,
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
    <>
      <CursorFollower />
      <Navbar locale={locale} navLabels={dict.nav} />
      {children}
    </>
  )
}
