import React from 'react'

import Blank from '@/layouts/Blank'
import getAssets from '@/utils/getAssets'
import VerticalCarousel from '@/components/Vertical Carousel'
import useLanguage from '@/utils/useLanguage'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface PiagamDanPenghargaanTranslations {
  id: number
  piagam_dan_penghargaan_id: number
  languages_code: string
  title: string
  caption: string
}
export interface PiagamDanPenghargaanType {
  id: number
  image: string
  translations: PiagamDanPenghargaanTranslations[]
}

interface PiagamDanPenghargaanProps {
  dataPiagam: PiagamDanPenghargaanType[]
}

const PiagamDanPenghargaan: React.FC<PiagamDanPenghargaanProps> = ({ dataPiagam }) => {
  const language = useLanguage()
  // console.log('ini data Piagam', dataPiagam)
  return (
    <Blank title='Piagam Penghargaan'>
      <div className='h-screen w-full bg-primary-900'>
        <Carousel
          opts={{
            align: 'start',
          }}
          orientation='vertical'
          className='w-full max-w-xs'
        >
          <CarouselContent>
            {dataPiagam.map((data) => {
              const dataTranslation = data.translations.find((i) => i.languages_code === language)
              return (
                <CarouselItem
                  key={data.id}
                  className='basis-full'
                >
                  <h3>{dataTranslation?.title}</h3>
                  <p>{dataTranslation?.caption}</p>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Blank>
  )
}

export default PiagamDanPenghargaan
