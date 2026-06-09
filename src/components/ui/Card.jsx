const Card = (props) => {
  const padding = props.padding || 'default'
  const className = props.className || ''

  let paddingClass = 'p-6'
  if (padding === 'none') paddingClass = ''
  if (padding === 'sm') paddingClass = 'p-4'
  if (padding === 'lg') paddingClass = 'p-8'

  const cardClass = `bg-white border border-pink-100 rounded-lg shadow-md ${paddingClass} ${className}`

  return <div className={cardClass}>{props.children}</div>
}

export default Card
