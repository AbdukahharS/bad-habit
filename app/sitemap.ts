import type { MetadataRoute } from 'next'

import { SITE_URL, locales } from '@/lib/i18n'

export const dynamic = 'force-static'
export const revalidate = 604800 // weekly

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    ...locales.map((locale) => ({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      alternates: {
        languages: {
          en: `${SITE_URL}/en`,
          uz: `${SITE_URL}/uz`,
        },
      },
      changeFrequency: 'weekly' as const,
      priority: locale === 'uz' ? 0.95 : 0.9,
    })),
    ...locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/projects`,
      lastModified: now,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/projects`,
          uz: `${SITE_URL}/uz/projects`,
        },
      },
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  ]
}
