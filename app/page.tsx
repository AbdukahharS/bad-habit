import Expertise from '@/components/layout/Expertise'
import Hero from '@/components/layout/Hero'
import Projects from '@/components/layout/Projects'
import Experience from '@/components/layout/Experience'
import Footer from '@/components/layout/Footer'

// Force static generation for SSG
export const dynamic = 'force-static'
export const metadata = {
  title: 'Shahzod Abdukahhar',
  description: 'Software Engineer and Web Developer specializing in React, NextJS, and Node.js',
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Expertise />
      <Projects />
      <Experience />
      <Footer />
    </main>
  )
}
