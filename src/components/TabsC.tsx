import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface Tab {
  title: string
  value: string
}

interface TabsCProps {
  defaultValue: string | undefined
  tabsTrigger: Tab[] | undefined
  tabsContent: React.ReactNode[] | undefined // Array of React children
  className?: string
  classNameTabList?: string
  classNameTrigger?: string
  classNameContent?: string
  onChange: (value: string) => void // Add this prop to notify parent of active tab changes
}

const TabsC: React.FC<TabsCProps> = ({
  defaultValue,
  tabsTrigger = [],
  tabsContent = [],
  className,
  onChange,
  classNameTabList,
  classNameTrigger,
  classNameContent,
}) => {
  const handleChange = (value: string) => {
    onChange(value)
  }

  return (
    <Tabs
      defaultValue={defaultValue}
      className={cn('w-full', className)}
      onValueChange={handleChange}
    >
      <TabsList className={cn(classNameTabList)}>
        {tabsTrigger?.map((tab) => {
          console.log('ini tab title di comp', tab.title)
          return (
            <TabsTrigger
              key={tab.title}
              value={tab?.title}
              className={cn('capitalize', classNameTrigger)}
            >
              {tab.title}
            </TabsTrigger>
          )
        })}
      </TabsList>

      {tabsContent?.map((content, index) => (
        <TabsContent
          key={index}
          value={tabsTrigger[index]?.title || ''}
          className={cn(classNameContent)}
        >
          {content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default TabsC
