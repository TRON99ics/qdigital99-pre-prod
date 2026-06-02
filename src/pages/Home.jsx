import Hero from '../components/hero/Hero'
import Intro from '../sections/home/Intro'
import Capabilities from '../sections/home/Capabilities'
import Results from '../sections/home/Results'
import IndustriesSection from '../sections/home/IndustriesSection'
import Process from '../sections/home/Process'
import FeaturedWork from '../sections/home/FeaturedWork'
import Testimonials from '../sections/home/Testimonials'
import CTA from '../sections/home/CTA'
import { useSeo } from '../lib/useSeo'

export default function Home() {
  useSeo({
    title: null,
    description:
      'QDigital99 is a growth partner for ambitious brands — SEO, paid media, performance marketing, and digital experiences engineered for measurable revenue.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <Intro />
      <Capabilities />
      <Results />
      <IndustriesSection />
      <Process />
      <FeaturedWork />
      <Testimonials />
      <CTA />
    </>
  )
}
