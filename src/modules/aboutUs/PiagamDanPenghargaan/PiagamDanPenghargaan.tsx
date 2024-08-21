import Image from 'next/image'
import React from 'react'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Blank from '@/layouts/Blank'
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
  return (
    <Blank title='Piagam Penghargaan'>
      <div className='bg-primary-900'>
        <Carousel orientation='vertical'>
          <CarouselContent>
            {/* {dataNewMahakam.map((d) => {
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
                      <button onClick={toggleModal}>
                        <Menu color='white' />
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })} */}
            {dataPiagam.map((data) => {
              const dataTranslation = data.translations.find((i) => i.languages_code === language)
              return (
                <CarouselItem
                  key={data.id}
                  className='h-fit'
                >
                  <h3>{dataTranslation?.title}</h3>
                  <p>{dataTranslation?.caption}</p>
                  <div className='relative size-10'>
                    <Image
                      src={String(getAssets(data.image))}
                      layout='fill'
                      alt=''
                    />
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className='left-6' />
          <CarouselNext className='right-6' />
        </Carousel>
      </div>
    </Blank>
  )
}

export default PiagamDanPenghargaan
