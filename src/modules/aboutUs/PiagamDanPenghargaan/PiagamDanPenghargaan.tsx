import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Blank from '@/layouts/Blank'
import convertRange from '@/utils/convertRange'
import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

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
  const [api, setApi] = useState<CarouselApi>()
  const [rotateDegree, setRotateDegree] = useState(0)
  const maxDegree = -((dataPiagam.length - 1) * 90)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('scroll', (e) => {
      setRotateDegree(convertRange(e.scrollProgress(), 0, 1, 0, maxDegree))
      setSelectedImage(e.selectedScrollSnap())
    })
  }, [api])
  return (
    <Blank title='Piagam Penghargaan'>
      <div className='h-screen bg-primary-900'>
        <div
          className='absolute -left-1/4 top-[20%] size-10 rounded-full sm:size-[800px]'
          style={{
            transform: `rotate(${rotateDegree}deg)`,
            backgroundImage: `url(${String(getAssets(dataPiagam[selectedImage].image))})`,
          }}
        />
        <Carousel
          opts={{
            align: 'start',
          }}
          orientation='vertical'
          className='py-10'
          setApi={setApi}
        >
          <CarouselContent className='h-[500px]'>
            {dataPiagam.map((data) => {
              const dataTranslation = data.translations.find((i) => i.languages_code === language)
              return (
                <CarouselItem
                  key={data.id}
                  className='mx-auto'
                >
                  <div className='flex w-fit flex-row gap-2 sm:gap-8'>
                    <div className='relative h-[150px] w-[300px] sm:h-[400px] sm:w-[300px]'>
                      <Image
                        src={String(getAssets(data.image))}
                        layout='fill'
                        alt=''
                      />
                    </div>
                    <div className='my-auto text-white'>
                      <h5 className='mb-5 text-h5-mobile sm:text-h5-desktop'>{dataTranslation?.title}</h5>
                      <p className='text-h6-mobile sm:text-h6-desktop'>{dataTranslation?.caption}</p>
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </Blank>
  )
}

export default PiagamDanPenghargaan
