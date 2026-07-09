import { studioCredit } from '../../data/site'

/**
 * “Developed by TronzLabs” — shared footer credit pattern.
 */
export default function TronzlabsAttribution({ className = '' }) {
  return (
    <a
      href={studioCredit.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex max-w-full flex-col items-center gap-2 text-center text-xs transition-opacity hover:opacity-90 sm:flex-row sm:items-center sm:gap-2 sm:text-left ${className}`}
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
        className="studio-logo-glow h-4 w-4 shrink-0 object-contain"
        aria-hidden
      />
    </a>
  )
}
