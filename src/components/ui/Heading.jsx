const variants = {
  display:
    'font-display italic text-ivory text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] tracking-tight',
  script:
    'font-script text-roseGoldLight text-[clamp(3rem,9vw,7rem)] leading-[1.05]',
  section:
    'font-display italic text-ivory text-[clamp(1.85rem,3.5vw,2.75rem)] leading-tight',
  eyebrow:
    'font-eyebrow uppercase tracking-[0.45em] text-champagne/80 text-xs sm:text-sm',
}

export default function Heading({
  variant = 'section',
  as,
  className = '',
  children,
}) {
  const fallbackTag =
    variant === 'eyebrow'
      ? 'span'
      : variant === 'display' || variant === 'script'
        ? 'h1'
        : 'h2'

  const Tag = as ?? fallbackTag

  return (
    <Tag className={`${variants[variant]} ${className}`}>{children}</Tag>
  )
}
