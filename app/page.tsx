import Expertise from '@/components/layout/Expertise'
import Hero from '@/components/layout/Hero'
import Projects from '@/components/layout/Projects'
import Experience from '@/components/layout/Experience'
import Footer from '@/components/layout/Footer'

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
