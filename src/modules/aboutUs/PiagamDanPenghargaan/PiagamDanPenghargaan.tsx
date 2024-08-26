import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Blank from '@/layouts/Blank'
import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'
import convertRange from '@/utils/convertRange'

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

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('scroll', (e) => {
      // Do something on select.
      setRotateDegree(convertRange(e.scrollProgress(), 0, 1, 0, maxDegree))
    })
  }, [api])
  console.log(dataPiagam[0].image)
  return (
    <Blank title='Piagam Penghargaan'>
      <div className='h-screen bg-primary-900'>
        <Carousel
          opts={{
            align: 'start',
          }}
          orientation='vertical'
          className='py-10'
          setApi={setApi}
        >
          <div
            className='absolute -left-1/4 top-8 size-[800px] rounded-full border-r-4'
            style={{
              transform: `rotate(${rotateDegree}deg)`,
              backgroundImage: `url(${String(getAssets(dataPiagam[0].image))})`,
            }}
          />
          <CarouselContent className='h-[500px]'>
            {dataPiagam.map((data) => {
              const dataTranslation = data.translations.find((i) => i.languages_code === language)
              return (
                <CarouselItem
                  key={data.id}
                  className='mx-auto'
                >
                  <div className='flex w-fit flex-row gap-8'>
                    <div className='relative h-[400px] w-[300px]'>
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

          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </div>
    </Blank>
  )
}

export default PiagamDanPenghargaan
