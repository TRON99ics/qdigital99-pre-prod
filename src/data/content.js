import { images } from './images'

// Metrics, whyChooseUs, testimonials, insights — shared content.

export const metrics = [
  { value: 312, prefix: '+', suffix: '%', label: 'Avg. revenue growth' },
  { value: 95, suffix: '%+', label: 'Client retention' },
  { value: 4.8, suffix: '×', label: 'Average ROAS' },
  { value: 50, suffix: '+', label: 'Brands partnered' },
]

export const whyChooseUs = {
  eyebrow: 'Why QDigital99',
  title: 'Why Businesses Choose QDigital99',
  intro:
    'Businesses partner with us because they need measurable growth, transparent execution, and strategies built around real business objectives.',
  reasons: [
    {
      title: '95%+ Client Retention Rate',
      body: 'We focus on long-term partnerships built on performance, transparency, and consistent delivery.',
    },
    {
      title: 'Data-Driven Decision Making',
      body: 'Every recommendation is backed by analytics, market insights, and measurable performance indicators.',
    },
    {
      title: 'Weekly Progress Updates',
      body: 'Stay informed with clear communication, project updates, campaign performance, and next-step action plans.',
    },
    {
      title: 'Monthly Growth Reports',
      body: 'Comprehensive reports covering traffic, leads, conversions, campaign performance, and growth opportunities.',
    },
    {
      title: 'Multi-Market Expertise',
      body: 'Strategies tailored for businesses operating in Australia, the United States, and India.',
    },
    {
      title: 'Dedicated Growth Support',
      body: 'A proactive team focused on helping your business adapt, improve, and scale over time.',
    },
    {
      title: 'Conversion-Focused Execution',
      body: 'Every campaign, website, and funnel is built to maximize business outcomes—not just traffic.',
    },
    {
      title: 'Long-Term Growth Strategy',
      body: "We don't focus on short-term spikes. We build systems designed for sustainable and scalable growth.",
    },
  ],
}

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
