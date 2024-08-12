import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

export interface NewMahakamGrandeTranslations {
  id: number
  new_mahakam_id: number
  languages_code: string
  title: string
  subTitle: string
}
export interface NewMahakamGrandeType {
  id: number
  path: string
  image: string
  translations: NewMahakamGrandeTranslations[]
}

interface NewMahakamGrandeProps {
  dataNewMahakam: NewMahakamGrandeType[]
}

const NewMahakamGrande: React.FC<NewMahakamGrandeProps> = ({ dataNewMahakam }) => {
  const language = useLanguage()
  return (
    <Carousel>
      <CarouselContent>
        {dataNewMahakam.map((d) => {
          const dataTranslation = d.translations.find((i) => i.languages_code === language)
          return (
            <CarouselItem key={d.id}>
              <div className='relative h-[300px] w-full md:h-[700px]'>
                <Image
                  src={String(getAssets(d.image))}
                  layout='fill'
                  alt='image'
                />
                <div className='absolute inset-0 bg-black opacity-50' />
                <div className='absolute flex size-full flex-col items-center justify-between py-6 text-white'>
                  <div className='text-center'>
                    <h5 className='text-h5-mobile font-semibold md:text-h5-desktop'>{dataTranslation?.title}</h5>
                    <p className='mt-4 text-medium-mobile font-bold md:text-medium-desktop'>
                      {dataTranslation?.subTitle}{' '}
                      <span className='ml-4'>
                        <Link href={d.path}>View more</Link>
                      </span>
                    </p>
                  </div>
                  <div>
                    <Menu color='white' />
                  </div>
                </div>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className='left-0' />
      <CarouselNext className='right-2' />
    </Carousel>
  )
}

export default NewMahakamGrande
