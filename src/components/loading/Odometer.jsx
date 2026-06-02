const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function OdometerDigit({ digit, roll }) {
  return (
    <span className="odometer-digit" aria-hidden="true">
      <span
        className="odometer-strip"
        style={{
          transform: `translate3d(0, ${-digit * 10}%, 0)`,
          transition: roll ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        }}
      >
        {DIGITS.map((n) => (
          <span key={n} className="odometer-cell">
            {n}
          </span>
        ))}
      </span>
    </span>
  )
}

export default function Odometer({ value = 0, roll = true }) {
  const clamped = Math.min(99, Math.max(0, Math.floor(value)))
  const str = String(clamped).padStart(3, '0')
  const digits = [parseInt(str[0], 10), parseInt(str[1], 10), parseInt(str[2], 10)]

  return (
    <span
      className="odometer inline-flex items-baseline text-white"
      aria-live="polite"
      aria-label={`Loading ${clamped} percent`}
    >
      {digits.map((d, i) => (
        <OdometerDigit key={i} digit={d} roll={roll} />
      ))}
    </span>
  )
}
