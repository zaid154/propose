export default function Card({
  children,
  className = '',
  padding = 'default',
  as: Tag = 'div',
}) {
  const paddings = {
    none: '',
    sm: 'p-5 sm:p-6',
    default: 'p-6 sm:p-9',
    lg: 'p-8 sm:p-12',
  }

  return (
    <Tag
      className={[
        'relative rounded-2xl border border-ivory/10 bg-white/[0.03] backdrop-blur-md shadow-soft',
        paddings[padding],
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  )
}
