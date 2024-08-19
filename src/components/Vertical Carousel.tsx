import * as React from 'react'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface VerticalCarouselProps {
  itemClass?: string
  children: React.ReactNode[]
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({ itemClass, children }) => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      orientation='vertical'
      className='w-full max-w-xs'
    >
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

export default VerticalCarousel
