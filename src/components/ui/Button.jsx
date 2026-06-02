import { Link } from 'react-router-dom'
import Magnetic from './Magnetic'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-300 will-change-transform'

const variants = {
  primary: 'bg-blue text-white hover:bg-[#0b35d6]',
  dark: 'bg-ink text-white hover:bg-[#1c1c1c]',
  ghost: 'border border-line text-ink hover:border-ink',
  light: 'bg-white text-ink hover:bg-surface',
}

const sizes = {
  md: 'h-11 px-6',
  lg: 'h-14 px-8 text-base',
}

function Inner({ children }) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  )
}

export default function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  magnetic = true,
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  let el
  if (to) {
    el = (
      <Link to={to} className={cls} onClick={onClick}>
        <Inner>{children}</Inner>
      </Link>
    )
  } else if (href) {
    el = (
      <a href={href} className={cls} onClick={onClick}>
        <Inner>{children}</Inner>
      </a>
    )
  } else {
    el = (
      <button type={type} onClick={onClick} className={cls}>
        <Inner>{children}</Inner>
      </button>
    )
  }
  return magnetic ? <Magnetic strength={0.3}>{el}</Magnetic> : el
}
