

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-400',
    textColor = 'white',
    className = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${textColor} ${bgColor} ${className}`}>{children}</button>
  )
}

export default Button