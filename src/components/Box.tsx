import React from 'react'

export interface BoxProps {
  children: React.ReactNode
}

const Box: React.FC<BoxProps> = ({ children }) => {
  return <div className='box-content py-2'>{children}</div>
}

export default Box
