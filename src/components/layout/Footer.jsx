import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import Button from '../ui/Button'
import SplitText from '../motion/SplitText'
import FooterBrand from '../ui/FooterBrand'
import TronzlabsAttribution from '../ui/TronzlabsAttribution'
import { site, footerNav, modelCredits } from '../../data/site'

export default function Footer() {
  return (
    <footer className="relative bg-ink text-white">
      <Container className="py-16 md:py-24 lg:py-32">
        <div className="grid gap-12 md:gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div className="text-center sm:text-left">
            <SplitText as="h2" className="display text-white">
              Let's build.
            </SplitText>
            <p className="mx-auto mt-6 max-w-[40ch] text-lg text-white/60 sm:mx-0 md:mt-8">
              {site.positioning}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
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

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {Object.entries(footerNav).map(([group, links]) => (
              <div key={group} className="text-center sm:text-left">
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

        <div className="mt-16 space-y-8 border-t border-white/10 pt-8 md:mt-24 md:space-y-6">
          <div className="flex justify-center px-2">
            <FooterBrand />
          </div>

          <p className="text-center text-xs leading-relaxed text-white/35 md:text-left">
            {modelCredits.map((c, i) => (
              <span key={c.url}>
                {i > 0 ? ' ' : null}
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:text-white/55 hover:underline"
                >
                  &ldquo;{c.name}&rdquo;
                </a>{' '}
                by {c.author} is licensed under{' '}
                <a
                  href={c.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:text-white/55 hover:underline"
                >
                  Creative Commons Attribution ({c.license})
                </a>
                .
              </span>
            ))}
          </p>

          <div className="flex flex-col items-center gap-4 text-center text-sm text-white/40 sm:items-start sm:text-left lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 sm:justify-start sm:gap-x-6 sm:gap-y-2">
              {site.markets.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            {site.phones.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-4 sm:justify-start sm:gap-6">
                {site.phones.map((p) => (
                  <span key={p.region}>
                    {p.region} {p.number}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:justify-start sm:gap-x-6 sm:gap-y-2">
              <Link to="/privacy" className="underline-offset-4 hover:text-white/70 hover:underline">
                Privacy Policy
              </Link>
              <span>© {new Date().getFullYear()} {site.name}</span>
            </div>
          </div>

          <div className="flex justify-center border-t border-white/10 pt-6 md:justify-start">
            <TronzlabsAttribution />
          </div>
        </div>
      </Container>
    </footer>
  )
}
