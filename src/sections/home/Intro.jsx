import Container from '../../components/ui/Container'
import SplitText from '../../components/motion/SplitText'
import Reveal from '../../components/motion/Reveal'
import Button from '../../components/ui/Button'

/**
 * SECTION 01 — Agency introduction. Emerges from the hero's black.
 */
export default function Intro() {
  return (
    <section className="relative bg-ink py-32 text-white md:py-48">
      <Container>
        <div className="eyebrow mb-10 flex items-center gap-3 text-white/40">
          <span className="inline-block h-px w-8 bg-white/30" />
          The agency universe
        </div>
        <SplitText as="h2" className="display max-w-[20ch] text-balance text-white" stagger={0.04}>
          We help ambitious brands grow through strategy, content, performance marketing, and digital experiences.
        </SplitText>
        <Reveal className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[1fr_auto] md:items-end" y={24}>
          <p className="max-w-[52ch] text-lg leading-relaxed text-white/60 md:text-xl">
            Not an agency. Not a vendor. A growth partner that treats marketing as a
            revenue system — engineered, measured, and built to compound.
          </p>
          <Button to="/about" variant="light" size="lg">
            How we think
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
