const Section = (props) => {
  const size = props.size || 'default'
  const className = props.className || ''

  let widthClass = 'max-w-5xl'
  if (size === 'sm') widthClass = 'max-w-2xl'
  if (size === 'lg') widthClass = 'max-w-6xl'
  if (size === 'full') widthClass = 'max-w-none'

  return (
    <section className={`relative w-full ${className}`}>
      <div className={`mx-auto px-4 sm:px-8 ${widthClass}`}>{props.children}</div>
    </section>
  )
}

export default Section
