import { brand } from '../../data/site'

const sizes = {
  nav: 'h-6 w-auto max-w-[7rem] sm:max-w-[8rem] md:h-7 md:max-w-[8.75rem]',
  footer: 'h-5 w-5',
}

const tileBase = 'brand-logo-tile inline-flex shrink-0 items-center justify-center rounded-md'

/**
 * Brand mark — white tile with primary blue gradient glow (nav + footer).
 */
export default function SiteLogo({ variant = 'nav', className = '' }) {
  const isNav = variant === 'nav'

  const img = (
    <img
      src={brand.logo}
      alt={isNav ? brand.logoAlt : ''}
      width={isNav ? 140 : 20}
      height={isNav ? 28 : 20}
      className={`shrink-0 object-contain object-center ${sizes[variant]} ${className}`}
      aria-hidden={!isNav}
    />
  )

  if (isNav) {
    return (
      <span className={`${tileBase} brand-logo-tile--nav px-2 py-1.5 md:px-2.5 md:py-2`}>
        {img}
      </span>
    )
  }

  return (
    <span className={`${tileBase} h-8 w-8 p-1`} aria-hidden>
      {img}
    </span>
  )
}
