export default function Container({ children, className = '', size = 'default' }) {
  const max = size === 'wide' ? 'max-w-[1600px]' : size === 'narrow' ? 'max-w-[880px]' : 'max-w-[1320px]'
  return (
    <div className={`mx-auto w-full ${max} px-6 md:px-10 lg:px-14 ${className}`}>{children}</div>
  )
}
