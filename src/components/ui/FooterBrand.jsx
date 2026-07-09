import { Link } from 'react-router-dom'
import SiteLogo from './SiteLogo'
import { footerBrand } from '../../data/site'

/**
 * Centered footer brand — “Marketing Partner qdigital99” with logo.
 */
export default function FooterBrand({ className = '' }) {
  return (
    <Link
      to="/"
      className={`inline-flex max-w-full flex-col items-center gap-2 text-center text-xs transition-opacity hover:opacity-90 sm:flex-row sm:gap-2.5 sm:text-left ${className}`}
    >
      <SiteLogo variant="footer" />
      <span className="max-w-[16rem] text-balance text-white/45 sm:max-w-none">
        {footerBrand.label}{' '}
        <span className="font-medium text-white/80">{footerBrand.name}</span>
      </span>
    </Link>
  )
}
