import { images } from './images'

// Metrics, process, testimonials, insights — shared content.

export const metrics = [
  { value: 312, prefix: '+', suffix: '%', label: 'Avg. revenue growth' },
  { value: 98, suffix: '%', label: 'Client retention' },
  { value: 4.8, suffix: '×', label: 'Average ROAS' },
  { value: 50, suffix: '+', label: 'Brands partnered' },
]

export const process = [
  {
    step: '01',
    title: 'Discover',
    body: 'We map your market, competitors, and revenue gaps to find the highest-impact opportunities.',
  },
  {
    step: '02',
    title: 'Strategize',
    body: 'A custom full-funnel plan across the right channels — built around your goals, not templates.',
  },
  {
    step: '03',
    title: 'Launch',
    body: 'We ship fast, instrument everything, and optimize daily against real performance data.',
  },
  {
    step: '04',
    title: 'Scale',
    body: 'Transparent reporting and continuous scaling of what works — turning wins into compounding growth.',
  },
]

export const testimonials = [
  {
    quote:
      'QDigital helped us attract more qualified enquiries and strengthen our online presence. Their approach is strategic, transparent, and focused on long-term growth.',
    author: 'Director',
    company: 'Construction Industry, India',
  },
  {
    quote:
      'From strategy to execution, every campaign was aligned with our business goals. We saw better quality leads, stronger engagement, and measurable growth.',
    author: 'Founder',
    company: 'Lifestyle & Wellness Brand, USA',
  },
  {
    quote:
      'Our visibility in local search improved significantly, resulting in a steady increase in patient enquiries and bookings. The team delivers results while keeping the process simple and professional.',
    author: 'Principal Dentist',
    company: 'Dental Practice, Australia',
  },
  {
    quote:
      'Professional, proactive, and highly results-driven. Their marketing strategies helped us improve lead quality and attract the right customers consistently.',
    author: 'Principal Dentist',
    company: 'Dental Practice, Australia',
  },
]

export const differentiators = [
  {
    title: 'Full-funnel integration',
    body: 'SEO, paid media, CRM and content operate as one coordinated system — not isolated tactics.',
  },
  {
    title: 'Automation-first',
    body: 'CRM workflows that qualify, nurture, and convert automatically, around the clock.',
  },
  {
    title: 'Attribution you can trust',
    body: 'Tracking from first click to closed deal, with clear lines back to revenue.',
  },
  {
    title: 'Conversion-focused',
    body: 'Every page, ad, and journey is built around one outcome: the next step.',
  },
]

export const insights = [
  {
    id: 'attribution-2026',
    category: 'Measurement',
    title: 'Attribution after the cookie: what actually works in 2026',
    excerpt:
      'Server-side tracking, modeled conversions, and the metrics that still tie to revenue.',
    readingTime: '6 min',
    date: '2026-05-18',
    image: images.analyticsDashboard,
  },
  {
    id: 'creative-velocity',
    category: 'Paid Media',
    title: 'Creative velocity beats targeting',
    excerpt:
      'Why the volume and quality of creative now decides paid performance more than audiences.',
    readingTime: '5 min',
    date: '2026-04-22',
    image: images.businessReview,
  },
  {
    id: 'seo-ai-search',
    category: 'SEO',
    title: 'Ranking in AI search results',
    excerpt:
      'Structured content, entity clarity, and how organic strategy adapts to answer engines.',
    readingTime: '7 min',
    date: '2026-03-30',
    image: images.aiAssist,
  },
  {
    id: 'lifecycle-revenue',
    category: 'Lifecycle',
    title: 'The retention math most brands ignore',
    excerpt:
      'A simple model for why lifetime value, not CAC, should set your acquisition ceiling.',
    readingTime: '4 min',
    date: '2026-02-11',
    image: images.familyCare,
  },
]

export const team = [
  {
    name: 'Harshini',
    role: 'Director — Client Strategy & Growth',
    region: 'North America',
  },
  {
    name: 'Rashmi',
    role: 'Director — Client Strategy & Growth',
    region: 'Australia',
  },
]

export const values = [
  'Data before assumptions',
  'Strategy before execution',
  'Systems before scale',
  'Revenue before vanity metrics',
]
