import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import './globals.css'
import projects from '@/lib/data/projects.json'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
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
        {children}
      </body>
    </html>
  )
}
