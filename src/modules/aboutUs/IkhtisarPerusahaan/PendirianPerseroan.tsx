import Image from 'next/image'
import React from 'react'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { PendirianPerseroanType } from '@/interface/AboutUsType'
import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

interface PendirianPerseroanProps {
  pendirianPerseroan: PendirianPerseroanType[]
}

const PendirianPerseroan: React.FC<PendirianPerseroanProps> = ({ pendirianPerseroan }) => {
  const language = useLanguage()
  return (
    <Carousel>
      <CarouselContent>
        {pendirianPerseroan?.map((v) => (
          <CarouselItem
            key={v.id}
            className='mt-7'
          >
            <div className='grid h-full grid-cols-1 md:grid-cols-3'>
              <div className='bg-grey-900 px-4 py-8 md:px-9 md:py-[171px]'>
                <div className='container m-auto box-content flex flex-col gap-4 md:gap-6'>
                  <div className=' text-white'>
                    <h4 className='text-h4-desktop font-semibold'>
                      {v.translations.find((i) => i.languages_code === language)?.title}
                    </h4>
                    <h6 className='text-h6-desktop font-bold'>
                      {v.translations.find((i) => i.languages_code === language)?.year}
                    </h6>
                  </div>
                  <div className='text-body-desktop-regular'>
                    {v.translations.find((i) => i.languages_code === language)?.description}
                  </div>
                </div>
              </div>
              <div className='relative h-64 md:col-span-2 md:h-auto'>
                <Image
                  src={String(getAssets(v.backgroundImage))}
                  alt='image'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-0' />
      <CarouselNext className='right-2' />
    </Carousel>
  )
}

export default PendirianPerseroan
