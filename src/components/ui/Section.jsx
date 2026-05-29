export default function Section({
  children,
  size = 'default',
  className = '',
  as: Tag = 'section',
}) {
  const widths = {
    sm: 'max-w-2xl',
    default: 'max-w-5xl',
    lg: 'max-w-6xl',
    full: 'max-w-none',
  }

  return (
    <Tag className={`relative w-full ${className}`}>
      <div className={`mx-auto px-5 sm:px-8 ${widths[size]}`}>{children}</div>
    </Tag>
  )
}
