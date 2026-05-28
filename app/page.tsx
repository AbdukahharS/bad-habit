import type { Metadata } from 'next'

import CursorFollower from '@/components/CursorFollower'
import Expertise from '@/components/layout/Expertise'
import Experience from '@/components/layout/Experience'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/layout/Hero'
import Navbar from '@/components/layout/Navbar'
import Projects from '@/components/layout/Projects'
import { SITE_URL, getDictionary } from '@/lib/i18n'
import projects from '@/public/projects.json'

export const dynamic = 'force-static'
export const metadata: Metadata = {
  title: 'Shahzod Abdukahhar',
  description:
    'Software Engineer and Web Developer specializing in React, NextJS, and Node.js',
  robots: 'index, follow',
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      uz: `${SITE_URL}/uz`,
      'x-default': SITE_URL,
    },
  },
  other: {
    'llms-txt': 'https://abdukahhar.uz/projects.json',
  },
}

export default function Home() {
  const dict = getDictionary('en')

  return (
    <>
      <CursorFollower />
      <Navbar
        locale='en'
        basePath=''
        englishHref='/'
        navLabels={dict.nav}
      />
      <main>
        <Hero subtitle={dict.hero.subtitle} />
        <Expertise
          title={dict.expertise.title}
          subtitle={dict.expertise.subtitle}
          locale='en'
        />
        <Projects
          title={dict.projects.title}
          filterLabel={dict.projects.filter}
          liveLabel={dict.projects.live}
          codeLabel={dict.projects.code}
          packageLabel={dict.projects.package}
          categoryLabels={dict.categories}
          locale='en'
        />
        <Experience
          title={dict.experience.title}
          subtitle={dict.experience.subtitle}
          technologiesLabel={dict.experience.technologies}
          locale='en'
        />
        <Footer
          title={dict.footer.title}
          description={dict.footer.description}
          emailLabel={dict.footer.email}
          locale='en'
        />
      </main>
      <div className='sr-only' aria-hidden='true'>
        <h2>About Shahzod Abdukahhar</h2>
        <p>
          Shahzod Abdukahhar is a Software Engineer and Web Developer based in
          Tashkent, Uzbekistan with 4+ years of experience building enterprise
          applications, SaaS products, GIS platforms, SDKs, and full-stack
          solutions. Specializes in React, Next.js, Vue, TypeScript, Node.js,
          Bun, Flutter, Electron.js, and Tauri. Available for freelance and
          full-time opportunities. Contact: shahzod@abdukahhar.uz
        </p>
        <h2>All Projects</h2>
        {projects.map((project) => (
          <article key={project.name}>
            <h3>{project.name}</h3>
            <p>Category: {project.category}</p>
            <p>{project.description}</p>
            <p>Technologies: {project.tags.join(', ')}</p>
            {project.live && <p>Live URL: {project.live}</p>}
            {'source' in project && project.source && (
              <p>Source code: {project.source}</p>
            )}
          </article>
        ))}
      </div>
    </>
  )
}
