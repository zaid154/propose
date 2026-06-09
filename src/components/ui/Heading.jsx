const variantClasses = {
  display: 'font-display italic text-gray-800 text-4xl sm:text-5xl lg:text-6xl leading-tight',
  script: 'font-script text-pink-600 text-5xl sm:text-6xl leading-tight',
  section: 'font-display italic text-gray-800 text-2xl sm:text-3xl leading-tight',
  eyebrow: 'font-eyebrow uppercase tracking-widest text-pink-500 text-xs sm:text-sm',
}

const Heading = (props) => {
  const variant = props.variant || 'section'
  const className = props.className || ''

  let Tag = 'h2'
  if (props.as) {
    Tag = props.as
  } else if (variant === 'eyebrow') {
    Tag = 'span'
  } else if (variant === 'display' || variant === 'script') {
    Tag = 'h1'
  }

  const headingClass = `${variantClasses[variant]} ${className}`

  return <Tag className={headingClass}>{props.children}</Tag>
}

export default Heading
