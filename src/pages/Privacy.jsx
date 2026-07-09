import PageHeader from '../components/layout/PageHeader'
import Container from '../components/ui/Container'
import Reveal from '../components/motion/Reveal'
import { useSeo } from '../lib/useSeo'
import { site } from '../data/site'
import { privacyPolicy } from '../data/privacyPolicy'

function LegalList({ items }) {
  return (
    <ul className="legal-list mt-4 space-y-2">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function PrivacySection({ section }) {
  return (
    <article className="legal-section border-t border-line pt-10 md:pt-12">
      <h2 className="legal-heading">
        <span className="text-blue">{section.number}.</span> {section.title}
      </h2>

      {section.intro && (
        <p className="legal-body mt-4">
          {section.number === '5' ? (
            <>
              <strong className="font-semibold text-ink">{site.name}</strong> does not sell, rent, or
              trade your personal information.
            </>
          ) : section.number === '9' ? null : (
            section.intro
          )}
        </p>
      )}

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="legal-body mt-4">
          {paragraph === 'international-transfers' ? (
            <>
              As <strong className="font-semibold text-ink">{site.name}</strong> serves clients across
              multiple countries, your information may be processed or stored in jurisdictions outside
              your country of residence. We take appropriate measures to ensure your data remains
              protected in accordance with applicable privacy laws.
            </>
          ) : (
            paragraph
          )}
        </p>
      ))}

      {section.subsections?.map((sub) => (
        <div key={sub.title} className="mt-6">
          <h3 className="legal-subheading">{sub.title}</h3>
          <LegalList items={sub.items} />
        </div>
      ))}

      {section.items && <LegalList items={section.items} />}

      {section.outro && <p className="legal-body mt-4">{section.outro}</p>}

      {section.contact && (
        <div className="legal-contact mt-6 rounded-[var(--radius-xl)] border border-line bg-surface p-6 md:p-8">
          <p className="text-lg font-semibold tracking-tight text-ink">{site.name}</p>
          <dl className="mt-4 space-y-3 text-base text-ink-muted">
            <div>
              <dt className="eyebrow mb-1 text-ink-muted">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="legal-link font-medium text-ink">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-1 text-ink-muted">Website</dt>
              <dd>
                <a href={site.url} className="legal-link font-medium text-ink" target="_blank" rel="noopener noreferrer">
                  {site.url}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-1 text-ink-muted">Business Address</dt>
              <dd className="leading-relaxed">
                <strong className="font-medium text-ink">United States Location</strong>
                <br />
                151 Vernon St, Worcester, MA 01610
                <br />
                <br />
                <strong className="font-medium text-ink">Australia Location</strong>
                <br />
                Baldivis, WA 6171
              </dd>
            </div>
          </dl>
        </div>
      )}
    </article>
  )
}

export default function Privacy() {
  useSeo({
    title: 'Privacy Policy',
    description: `How ${site.name} collects, uses, stores, and protects your personal information.`,
    path: '/privacy',
  })

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How we collect, use, and protect your information when you visit our website or use our services."
      />

      <section className="bg-paper py-20 md:py-28">
        <Container size="narrow">
          <Reveal>
            <p className="eyebrow text-ink-muted">
              Effective date: <span className="font-medium text-ink">{privacyPolicy.effectiveDate}</span>
            </p>
          </Reveal>

          <div className="legal-prose mt-10 md:mt-12">
            <Reveal>
              <p className="legal-body">
                Welcome to <strong className="font-semibold text-ink">{site.name}</strong>. We value your
                privacy and are committed to protecting your personal information. This{' '}
                <strong className="font-semibold text-ink">Privacy Policy</strong> explains how we
                collect, use, store, and protect the information you provide when you visit our website
                or use our services.
              </p>
            </Reveal>
            <Reveal>
              <p className="legal-body mt-4">
                By accessing or using our website, you agree to the practices described in this{' '}
                <strong className="font-semibold text-ink">Privacy Policy</strong>.
              </p>
            </Reveal>

            {privacyPolicy.sections.map((section) => (
              <Reveal key={section.number}>
                <PrivacySection section={section} />
              </Reveal>
            ))}

            <Reveal>
              <p className="legal-body legal-closing mt-12 border-t border-line pt-10 md:mt-14 md:pt-12">
                {privacyPolicy.closing}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
