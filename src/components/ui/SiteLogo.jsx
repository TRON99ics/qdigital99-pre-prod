import { brand } from '../../data/site'

const sizes = {
  nav: 'h-9 w-auto max-w-[9rem] sm:max-w-[10rem] md:h-10 md:max-w-[11rem]',
  footer: 'h-8 w-8',
}

/**
 * Brand mark — nav + footer logo (transparent PNG).
 */
export default function SiteLogo({ variant = 'nav', className = '' }) {
  const isNav = variant === 'nav'

  return (
    <img
      src={brand.logo}
      alt={isNav ? brand.logoAlt : ''}
      width={isNav ? 180 : 32}
      height={isNav ? 40 : 32}
      className={`inline-flex shrink-0 object-contain object-center ${sizes[variant]} ${className}`}
      aria-hidden={!isNav}
    />
  )
}
