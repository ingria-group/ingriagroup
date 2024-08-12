import * as Icons from 'lucide-react'

export const getIcon = (iconName: string) => {
  const IconComponent = (Icons as any)[iconName]

  if (!IconComponent) {
    throw new Error(`Icon ${iconName} does not exist in lucide-react library`)
  }
}
