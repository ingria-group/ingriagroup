import React from 'react'

export interface TabCardProps {
  icon?: React.ReactElement
  colorIcon?: string
  title?: string
}

const TabCard: React.FC<TabCardProps> = ({ icon, colorIcon = '#82B4E0', title }) => {
  return (
    <div className=' box-content rounded-[8px] bg-white px-4 pb-4 pt-5 shadow-xl'>
      <div className='flex flex-col gap-3 text-h6-desktop font-semibold  '>
        {icon && React.cloneElement(icon, { style: { color: colorIcon } })}
        <span>{title}</span>
      </div>
    </div>
  )
}

export default TabCard
