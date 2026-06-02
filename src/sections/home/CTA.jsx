import Container from '../../components/ui/Container'
import SplitText from '../../components/motion/SplitText'
import Button from '../../components/ui/Button'
import Marquee from '../../components/ui/Marquee'

const words = ['SEO', 'Paid Media', 'Performance', 'Social', 'Content', 'Brand', 'Web', 'CRO']

/**
 * SECTION 08 — Closing CTA. Large typography.
 */
export default function CTA() {
  return (
    <section className="bg-paper pt-28 md:pt-40">
      <Marquee speed={50} className="border-y border-line py-6">
        {words.map((w) => (
          <span key={w} className="mx-8 text-2xl font-medium tracking-tight text-ink-muted md:text-4xl">
            {w} <span className="text-blue">✦</span>
          </span>
        ))}
      </Marquee>

      <Container className="py-28 text-center md:py-40">
        <div className="eyebrow mb-8 text-ink-muted">Ready when you are</div>
        <SplitText as="h2" className="display mx-auto max-w-[18ch] text-balance text-ink">
          Let's build something that grows.
        </SplitText>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Button to="/contact" variant="dark" size="lg">
            Book a strategy call
          </Button>
          <Button to="/case-studies" variant="ghost" size="lg" magnetic={false}>
            See the work
          </Button>
        </div>
      </Container>
    </section>
  )
}
