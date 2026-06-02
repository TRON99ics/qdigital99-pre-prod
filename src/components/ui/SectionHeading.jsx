import SplitText from '../motion/SplitText'

export default function SectionHeading({ eyebrow, title, intro, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <div className="eyebrow mb-5 flex items-center gap-3 text-ink-muted">
          <span className="inline-block h-px w-8 bg-ink/30" />
          {eyebrow}
        </div>
      )}
      <SplitText
        as="h2"
        className="display max-w-[18ch] text-balance text-ink"
      >
        {title}
      </SplitText>
      {intro && (
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-muted md:text-xl">
          {intro}
        </p>
      )}
    </div>
  )
}
