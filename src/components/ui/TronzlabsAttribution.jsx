import { studioCredit } from '../../data/site'

/**
 * “Developed and maintained by TronzLabs” — shared footer credit pattern.
 */
export default function TronzlabsAttribution({ className = '' }) {
  return (
    <a
      href={studioCredit.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex max-w-full flex-wrap items-center justify-center gap-2 text-xs transition-opacity hover:opacity-90 ${className}`}
    >
      <span className="text-white/45">{studioCredit.label}</span>
      <span className="font-medium whitespace-nowrap">
        <span className="text-white">Tron</span>
        <span className="text-red-500 underline underline-offset-2">z</span>
        <span className="text-white/55">labs</span>
      </span>
      <img
        src="/tronzlabs-logo.png"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 shrink-0 object-contain"
        aria-hidden
      />
    </a>
  )
}
