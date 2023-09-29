import React from "react"
import "./style.scss"

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined
  mr?: number
  mt?: number
  width?: number
  ref?: any
  disabled?: boolean
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}
const Button: React.FC<ButtonProps> = ({
  type,
  mr,
  mt,
  width,
  ref,
  disabled,
  onClick,
  children
}) => {
  return (
    <button
      style={{ marginRight: mr, marginTop: mt, width }}
      className="button"
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export default Button
