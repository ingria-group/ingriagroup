import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { BidangUsahaType } from '@/interface/BidangUsahaType'
import convertRange from '@/utils/convertRange'
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
  dataBidangUsaha: BidangUsahaType[]
}

const NewMahakamGrande: React.FC<NewMahakamGrandeProps> = ({ dataNewMahakam, dataBidangUsaha }) => {
  const language = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  // const [api, setApi] = React.useState<CarouselApi>()

  // React.useEffect(() => {
  //   if (!api) {
  //     return
  //   }

  //   api.on('scroll', (e) => {
  //     // Do something on select.
  //     console.log('ini setelah convert', convertRange(e.scrollProgress(), 0, 1, 0, 360))
  //     console.log(e.scrollProgress())
  //   })
  // }, [api])

  return (
    <>
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
                      <button onClick={toggleModal}>
                        <Menu color='white' />
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className='left-6' />
        <CarouselNext className='right-6' />
      </Carousel>

      {/* Modal Dropdown */}
      {isModalOpen && (
        <div className='fixed inset-x-0 bottom-0 z-50 h-[50vh] w-full translate-y-0 bg-grey-900 text-white shadow-lg transition-transform duration-300 ease-in-out'>
          <div className=' size-full overflow-y-auto  p-6'>
            <div className='relative mb-7'>
              <button
                onClick={toggleModal}
                className=' absolute right-1/2 top-0 text-center text-white hover:text-gray-700'
              >
                <Menu color='white' />
              </button>
            </div>
            <ul className='grid grid-cols-3 space-y-2'>
              {dataBidangUsaha.map((i) => (
                <li
                  key={i.id}
                  className='mx-auto px-7 py-4 hover:bg-primary-800'
                >
                  <Link href={i.path}>{i.title}</Link>
                </li>
              ))}

              {/* Add more menu items as needed */}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default NewMahakamGrande
