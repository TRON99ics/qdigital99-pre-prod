import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import { useSeo } from '../lib/useSeo'

export default function NotFound() {
  useSeo({ title: 'Not found', path: '/404' })
  return (
    <section className="flex min-h-[100svh] items-center bg-ink pb-16 pt-[calc(var(--site-header)+2rem)] text-white">
      <Container>
        <div className="eyebrow text-white/40">404</div>
        <h1 className="mega mt-6 text-white">Lost the thread.</h1>
        <p className="mt-8 max-w-[40ch] text-xl text-white/55">
          This page doesn't exist — but the work does.
        </p>
        <div className="mt-12">
          <Button to="/" variant="primary" size="lg">
            Back home
          </Button>
        </div>
      </Container>
    </section>
  )
}
