import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import SmoothScroll from './providers/SmoothScroll'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const Industries = lazy(() => import('./pages/Industries'))
const Insights = lazy(() => import('./pages/Insights'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <SmoothScroll>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/about"
            element={
              <Suspense fallback={null}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/services"
            element={
              <Suspense fallback={null}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="/case-studies"
            element={
              <Suspense fallback={null}>
                <CaseStudies />
              </Suspense>
            }
          />
          <Route
            path="/industries"
            element={
              <Suspense fallback={null}>
                <Industries />
              </Suspense>
            }
          />
          <Route
            path="/insights"
            element={
              <Suspense fallback={null}>
                <Insights />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={null}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </SmoothScroll>
  )
}
