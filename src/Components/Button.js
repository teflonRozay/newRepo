import React from 'react'

const Button = ({
  type,
  className,
  text

}) => {
    const style =`h-14 rounded-lg text-white text-16px w-full ${className}`
  return (
    <button className={style} type={type}>
      {text}
    </button>
  )
}

export default Button
