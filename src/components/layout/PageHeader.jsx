import Container from '../ui/Container'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'

/**
 * Shared editorial page header. Dark band so the fixed nav reads on entry.
 */
export default function PageHeader({ eyebrow, title, intro, meta }) {
  return (
    <header className="relative bg-ink pb-20 pt-[calc(var(--site-header)+2.5rem)] text-white md:pb-28 md:pt-[calc(var(--site-header)+4rem)]">
      <Container>
        <div className="eyebrow mb-8 flex items-center gap-3 text-white/40">
          <span className="inline-block h-px w-8 bg-white/30" />
          {eyebrow}
        </div>
        <SplitText as="h1" className="display max-w-[18ch] text-balance text-white" stagger={0.05}>
          {title}
        </SplitText>
        {intro && (
          <Reveal y={20} delay={0.2}>
            <p className="mt-10 max-w-[52ch] text-lg leading-relaxed text-white/55 md:text-2xl">
              {intro}
            </p>
          </Reveal>
        )}
        {meta && (
          <Reveal
            y={16}
            delay={0.3}
            stagger={0.06}
            className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-8"
          >
            {meta.map((m) => (
              <div key={m.label}>
                <div className="text-2xl font-semibold tracking-tight md:text-3xl">{m.value}</div>
                <div className="mt-1 text-sm text-white/40">{m.label}</div>
              </div>
            ))}
          </Reveal>
        )}
      </Container>
    </header>
  )
}
