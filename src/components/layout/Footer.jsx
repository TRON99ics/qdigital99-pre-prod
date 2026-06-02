import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import Button from '../ui/Button'
import SplitText from '../motion/SplitText'
import { site, footerNav } from '../../data/site'

export default function Footer() {
  return (
    <footer className="relative bg-ink text-white">
      <Container className="py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SplitText as="h2" className="mega text-white">
              Let's build.
            </SplitText>
            <p className="mt-8 max-w-[40ch] text-lg text-white/60">
              {site.positioning}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button to="/contact" variant="primary" size="lg">
                Start a project
              </Button>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-white/70 underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-3">
            {Object.entries(footerNav).map(([group, links]) => (
              <div key={group}>
                <div className="eyebrow mb-5 text-white/40">{group}</div>
                <ul className="space-y-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {site.markets.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <div className="flex gap-6">
            {site.phones.map((p) => (
              <span key={p.region}>
                {p.region} {p.number}
              </span>
            ))}
          </div>
          <div>© {new Date().getFullYear()} {site.name}</div>
        </div>
      </Container>
    </footer>
  )
}
