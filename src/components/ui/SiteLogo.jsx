import { brand } from '../../data/site'

const sizes = {
  nav: 'h-8 w-auto max-w-[8rem] sm:max-w-[9rem] md:h-9 md:max-w-[10rem]',
  footer: 'h-7 w-7',
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
      width={isNav ? 160 : 28}
      height={isNav ? 36 : 28}
      className={`shrink-0 object-contain object-center ${sizes[variant]} ${className}`}
      aria-hidden={!isNav}
    />
  )

  if (isNav) {
    return (
      <span className={`${tileBase} brand-logo-tile--nav px-1 py-0.5 md:px-1.5 md:py-1`}>
        {img}
      </span>
    )
  }

  return (
    <span className={`${tileBase} h-8 w-8 p-0.5`} aria-hidden>
      {img}
    </span>
  )
}
