import { images } from './images'

// Proof points. Real growth stories, compressed to the result.
export const caseStudies = [
  {
    id: 'healthcare-growth',
    client: 'Regional Health Group',
    industry: 'Healthcare',
    title: 'A patient pipeline that fills itself',
    challenge: 'Low search visibility and inconsistent lead flow from digital channels.',
    strategy: ['Local SEO', 'Google Ads restructure', 'Landing page rebuild', 'Conversion tracking'],
    results: [
      { value: 120, suffix: '%', label: 'Increase in inquiries' },
      { value: 65, suffix: '%', label: 'Traffic growth' },
      { value: 40, suffix: '%', label: 'Reduction in CPL' },
    ],
    accent: '#1347FF',
    image: images.healthcareMeeting,
  },
  {
    id: 'real-estate-leads',
    client: 'Coastal Property Co.',
    industry: 'Real Estate',
    title: 'Qualified buyers, not just clicks',
    challenge: 'High ad spend with low-quality leads and poor conversion rates.',
    strategy: ['Funnel landing pages', 'Google + Meta Ads', 'Audience targeting', 'Retargeting'],
    results: [
      { value: 3, suffix: '×', label: 'Qualified leads' },
      { value: 55, suffix: '%', label: 'Conversion improvement' },
      { value: 30, suffix: '%', label: 'Reduction in CPL' },
    ],
    accent: '#000000',
    image: images.realEstate,
  },
  {
    id: 'ecommerce-revenue',
    client: 'D2C Lifestyle Brand',
    industry: 'E-Commerce',
    title: 'Doubling revenue on the same audience',
    challenge: 'Low conversion rates and high cart abandonment.',
    strategy: ['Meta Ads optimization', 'Retargeting', 'Product page CRO', 'Email automation'],
    results: [
      { value: 2.5, suffix: '×', label: 'Revenue increase' },
      { value: 70, suffix: '%', label: 'Conversion rate lift' },
      { value: 35, suffix: '%', label: 'Repeat purchases' },
    ],
    accent: '#1347FF',
    image: images.revenues,
  },
  {
    id: 'education-enrollment',
    client: 'Skills Training Institute',
    industry: 'Education',
    title: 'Enrollment growth on a fixed budget',
    challenge: 'Low inquiry volume and poor lead quality.',
    strategy: ['Course-targeted Ads', 'Landing page optimization', 'CRM integration', 'Lead nurture'],
    results: [
      { value: 2, suffix: '×', label: 'Increase in inquiries' },
      { value: 60, suffix: '%', label: 'Lead quality improvement' },
      { value: 45, suffix: '%', label: 'Enrollment increase' },
    ],
    accent: '#000000',
    image: images.creativeTeam,
  },
]
