import { Link } from 'react-router-dom'

const variantClasses = {
  primary: 'bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition',
  ghost: 'border border-pink-300 text-pink-700 px-5 py-2 rounded-full hover:bg-pink-50 transition',
  link: 'text-pink-600 hover:underline',
}

const Button = (props) => {
  const variant = props.variant || 'primary'
  const className = props.className || ''
  const classes = `${variantClasses[variant]} ${className}`

  if (props.to) {
    return (
      <Link to={props.to} className={classes} onClick={props.onClick}>
        {props.children}
      </Link>
    )
  }

  if (props.href) {
    return (
      <a href={props.href} className={classes} onClick={props.onClick}>
        {props.children}
      </a>
    )
  }

  return (
    <button
      type={props.type || 'button'}
      className={classes}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button
