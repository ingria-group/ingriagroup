import React from 'react'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface CarouselCProps {
  itemClass?: string
  children: React.ReactNode
}

const CarouselC: React.FC<CarouselCProps> = ({ itemClass, children }) => {
  return (
    <Carousel>
      <CarouselContent>
        {React.Children.map(children, (child) => (
          <CarouselItem className={itemClass}>{child}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CarouselC
