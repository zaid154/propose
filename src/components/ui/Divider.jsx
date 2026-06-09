const Divider = (props) => {
  const className = props.className || ''
  const dividerClass = `border-t border-pink-200 w-full ${className}`

  return <div aria-hidden="true" className={dividerClass} />
}

export default Divider
