import { notFound } from 'next/navigation'

import Expertise from '@/components/layout/Expertise'
import Experience from '@/components/layout/Experience'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/layout/Hero'
import Projects from '@/components/layout/Projects'
import projects from '@/lib/data/projects.json'
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
      <Hero
        subtitle={dict.hero.subtitle}
        positioning={dict.hero.positioning}
        proofStrip={dict.hero.proofStrip}
        viewProjectsLabel={dict.hero.viewProjects}
        scrollDownLabel={dict.hero.scrollDown}
        shotUydekAlt={dict.hero.shotUydekAlt}
        shotYarrowAlt={dict.hero.shotYarrowAlt}
        locale={locale}
      />
      <Expertise
        title={dict.expertise.title}
        subtitle={dict.expertise.subtitle}
        locale={locale}
      />
      <Projects
        title={dict.projects.title}
        liveLabel={dict.projects.live}
        codeLabel={dict.projects.code}
        packageLabel={dict.projects.package}
        viewAllLabel={dict.projects.viewAll}
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
        colophon={dict.footer.colophon}
        locale={locale}
      />
      <div className='sr-only' aria-hidden='true'>
        <h2>{dict.seo.aboutHeading}</h2>
        <p>{dict.seo.aboutText}</p>
        <h2>{dict.seo.projectsHeading}</h2>
        {projects.map((project) => (
          <article key={project.name}>
            <h3>{project.name}</h3>
            <p>
              {dict.seo.categoryLabel}: {project.category}
            </p>
            <p>{project.description[locale]}</p>
            <p>
              {dict.seo.technologiesLabel}: {project.tags.join(', ')}
            </p>
            {project.live && (
              <p>
                {dict.seo.liveLabel}: {project.live}
              </p>
            )}
            {'source' in project && project.source && (
              <p>
                {dict.seo.sourceLabel}: {project.source}
              </p>
            )}
          </article>
        ))}
      </div>
    </main>
  )
}
