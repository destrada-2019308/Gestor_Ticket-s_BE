import React from 'react'

export const Input = ({type, placeholder, name, required, value, onChange}) => {
  return (
    <input 
    type={type}
    className="form-input input" 
    value={value} 
    onChange={onChange} 
    name={name} 
    placeholder={placeholder} 
    required={required}  />
  )
}
