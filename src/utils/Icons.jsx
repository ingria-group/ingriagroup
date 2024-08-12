import { icons } from 'lucide-react'

const Icons = ({ name, color, size }) => {
  const LucideIcon = icons[name]

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <LucideIcon
      color={color}
      size={size}
    />
  )
}

export default Icons
