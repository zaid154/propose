import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne/70 focus-visible:ring-offset-2 focus-visible:ring-offset-wine disabled:opacity-50 disabled:cursor-not-allowed'

const variants = {
  primary:
    'bg-roseGold text-ivory shadow-soft hover:bg-roseGoldLight hover:shadow-glow',
  ghost:
    'border border-ivory/25 text-ivory/90 hover:border-roseGoldLight hover:text-ivory hover:bg-ivory/[0.04]',
  link:
    'px-0 py-0 text-roseGoldLight underline-offset-4 hover:underline rounded-none',
}

export default function Button({
  variant = 'primary',
  as = 'button',
  to,
  href,
  className = '',
  children,
  ...rest
}) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  const Tag = as
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
