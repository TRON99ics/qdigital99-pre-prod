import { site } from './site'

export const privacyPolicy = {
  effectiveDate: 'July 2026',
  sections: [
    {
      number: '1',
      title: 'Information We Collect',
      intro: 'We may collect the following types of information:',
      subsections: [
        {
          title: 'Personal Information',
          items: [
            'Full Name',
            'Email Address',
            'Phone Number',
            'Company Name',
            'Website URL',
            'Business Information',
            'Any information you voluntarily submit through our contact forms or email.',
          ],
        },
        {
          title: 'Technical Information',
          items: [
            'IP Address',
            'Browser Type',
            'Device Information',
            'Operating System',
            'Pages Visited',
            'Time Spent on the Website',
            'Referring Website',
            'Cookies and Similar Technologies',
          ],
        },
      ],
    },
    {
      number: '2',
      title: 'How We Use Your Information',
      intro: 'The information we collect may be used to:',
      items: [
        'Respond to your enquiries.',
        'Provide digital marketing services.',
        'Prepare proposals and quotations.',
        'Improve our website and user experience.',
        'Manage client relationships.',
        'Send important service updates.',
        'Improve marketing campaigns.',
        'Analyze website traffic and visitor behaviour.',
        'Comply with legal obligations.',
      ],
    },
    {
      number: '3',
      title: 'Cookies',
      paragraphs: [
        'Our website may use cookies and similar tracking technologies to:',
      ],
      items: [
        'Improve website functionality.',
        'Remember user preferences.',
        'Measure website performance.',
        'Analyze visitor behaviour.',
        'Improve advertising campaigns.',
      ],
      outro:
        'You may disable cookies through your browser settings. However, some features of the website may not function properly.',
    },
    {
      number: '4',
      title: 'Third-Party Services',
      intro:
        'We may use trusted third-party services including but not limited to:',
      items: [
        'Google Analytics',
        'Google Ads',
        'Meta Pixel',
        'Microsoft Clarity',
        'CRM Platforms',
        'Email Marketing Platforms',
        'Website Hosting Providers',
      ],
      outro:
        'These providers may collect information according to their own privacy policies.',
    },
    {
      number: '5',
      title: 'Information Sharing',
      paragraphs: ['We may share your information only:'],
      items: [
        'With trusted service providers assisting us in delivering our services.',
        'When required by law.',
        'To protect our legal rights.',
        'During business restructuring or merger if applicable.',
      ],
    },
    {
      number: '6',
      title: 'Data Security',
      intro:
        'We implement reasonable technical and organizational measures to safeguard your personal information, including:',
      items: [
        'Secure servers',
        'SSL encryption',
        'Restricted access to authorized personnel',
        'Regular software updates',
        'Industry-standard security practices',
      ],
      outro:
        'While we strive to protect your information, no method of online transmission or electronic storage is completely secure.',
    },
    {
      number: '7',
      title: 'Data Retention',
      intro: 'We retain your personal information only for as long as necessary to:',
      items: [
        'Deliver our services.',
        'Meet legal and regulatory requirements.',
        'Resolve disputes.',
        'Enforce our agreements.',
      ],
      outro:
        'Once the information is no longer required, it will be securely deleted or anonymized.',
    },
    {
      number: '8',
      title: 'Your Rights',
      intro:
        'Depending on your location and applicable laws, you may have the right to:',
      items: [
        'Access your personal information.',
        'Correct inaccurate information.',
        'Request deletion of your data.',
        'Withdraw consent for marketing communications.',
        'Request a copy of your personal information.',
        'Object to certain processing activities.',
      ],
      outro:
        'To exercise any of these rights, please contact us using the details provided below.',
    },
    {
      number: '9',
      title: 'International Data Transfers',
      paragraphs: ['international-transfers'],
    },
    {
      number: '10',
      title: "Children's Privacy",
      paragraphs: [
        'Our services are intended for businesses and individuals aged 18 years or older.',
        'We do not knowingly collect personal information from children. If we become aware that personal information has been collected from a child without appropriate consent, we will promptly delete such information.',
      ],
    },
    {
      number: '11',
      title: 'External Links',
      paragraphs: [
        'Our website may contain links to third-party websites.',
        'We are not responsible for the privacy practices, security, or content of external websites. We encourage users to review the privacy policies of any third-party sites they visit.',
      ],
    },
    {
      number: '12',
      title: 'Changes to This Privacy Policy',
      paragraphs: [
        'We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or business practices.',
        'Any updates will be published on this page along with the revised Effective Date.',
      ],
    },
    {
      number: '13',
      title: 'Contact Us',
      intro:
        'If you have any questions regarding this Privacy Policy or how we handle your information, please contact us.',
      contact: true,
    },
  ],
  closing:
    'By using our website, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.',
}
