import { notFound } from 'next/navigation'

import Expertise from '@/components/layout/Expertise'
import Experience from '@/components/layout/Experience'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/layout/Hero'
import Projects from '@/components/layout/Projects'
import { getDictionary, isValidLocale, locales, type Locale } from '@/lib/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const dynamic = 'force-static'

export default async function Home({ params }: Props) {
  const { locale: localeParam } = await params
  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const dict = getDictionary(locale)

  return (
    <main>
      <Hero subtitle={dict.hero.subtitle} />
      <Expertise
        title={dict.expertise.title}
        subtitle={dict.expertise.subtitle}
        locale={locale}
      />
      <Projects
        title={dict.projects.title}
        filterLabel={dict.projects.filter}
        liveLabel={dict.projects.live}
        codeLabel={dict.projects.code}
        categoryLabels={dict.categories}
        locale={locale}
      />
      <Experience
        title={dict.experience.title}
        subtitle={dict.experience.subtitle}
        technologiesLabel={dict.experience.technologies}
        locale={locale}
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
