import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import CarouselC from '@/components/CarouselC'
import { Button } from '@/components/ui/button'
import { BidangUsahaTranslations, BidangUsahaType } from '@/interface/BidangUsahaType'
import Blank from '@/layouts/Blank'
import getAssets from '@/utils/getAssets'
import Icons from '@/utils/Icons'
import useLanguage from '@/utils/useLanguage'

interface BidangUsahaIdProps {
  bidangUsaha: BidangUsahaType[]
}

const BidangUsahaId: React.FC<BidangUsahaIdProps> = ({ bidangUsaha }) => {
  const language = useLanguage()
  const router = useRouter()
  const { path } = router.query
  const [dataTranslation, setDataTranslation] = useState<BidangUsahaTranslations>()
  const [selectData, setSelectData] = useState<BidangUsahaType>()

  useEffect(() => {
    if (path) {
      const selected = bidangUsaha.find((bidang) => bidang.path === path)
      const data = selected?.translations.find((i) => i.languages_code === language)
      setDataTranslation(data)
      setSelectData(selected)
    }
  }, [path, language])

  const handleBidangUsahaClick = (bidang: any) => {
    router.push(`/bidang-usaha/${bidang.path}`)
  }

  if (!selectData) {
    return <div>Loading...</div>
  }

  return (
    <Blank title='Bidang Usaha'>
      <div className='container mx-auto'>
        <div className='mb-9'>
          <div
            className='relative mb-4 box-content  px-4 py-5 sm:mb-8 sm:px-9 sm:py-8'
            style={{
              backgroundImage: `url(${String(getAssets(selectData.background))})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <div className='absolute inset-0 bg-white opacity-80' />
            <div className='relative grid grid-flow-row gap-3 sm:gap-9 md:grid-cols-5'>
              <div className='col-span-3'>
                <div className='mb-7 text-h2-mobile font-bold sm:text-h2-desktop'>{selectData?.title}</div>
                <div className='mb-6 text-body-mobile-regular sm:text-body-desktop-regular'>
                  {dataTranslation?.description}
                </div>
                <div>
                  <Link href={selectData.path}>
                    <Button
                      variant='primary'
                      size='sm'
                      icon={
                        <Icons
                          name='Link'
                          color='white'
                          size={20}
                        />
                      }
                    >
                      Kunjungi Situs
                    </Button>
                  </Link>
                </div>
              </div>
              <div className='relative size-full sm:col-span-2'>
                <div className='hidden sm:block'>
                  <Image
                    src={String(getAssets(selectData?.image))}
                    alt='image'
                    layout='fill'
                    className='sm:object-contain'
                  />
                </div>
                <div className='block sm:hidden'>
                  <Image
                    src={String(getAssets(selectData?.image))}
                    alt='image'
                    layout='fixed'
                    width={200}
                    height={200}
                    className='sm:object-contain'
                  />
                </div>
                {/* <div className='absolute inset-0 bg-black opacity-20' /> */}
              </div>
            </div>
          </div>
          <div className='mb-8 grid grid-flow-row gap-7 sm:grid-cols-5'>
            <div className='col-span-3'>
              <h6 className='mb-5 text-h6-desktop font-bold text-grey-800'> Fasilitas</h6>
              <div className='grid grid-cols-4 gap-3'>
                {dataTranslation?.fasilitas.map((i) => (
                  <div
                    className='box-content bg-grey-200 px-4 py-5'
                    key={i.id}
                  >
                    <div className='text-detail-desktop font-medium text-primary-500 sm:text-detail-desktop'>
                      Fasilitas
                    </div>
                    <p className='text-subtle-mobile font-bold sm:text-subtle-desktop'>{i.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='col-span-2'>
              <h6 className='mb-5 text-h6-desktop font-bold text-grey-800'> Kawasan Srategis</h6>
              <div className='flex flex-col gap-2'>
                {dataTranslation?.kawasan.map((i) => (
                  <div
                    className='box-content w-full bg-grey-200 px-4 py-5'
                    key={i.id}
                  >
                    <div className='text-detail-desktop font-medium text-primary-500'>Fasilitas</div>
                    <p className='text-subtle-desktop font-bold text-primary-800'>{i.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className='text-body-desktop-regular'>{dataTranslation?.footer}</p>
        </div>
        <div className='py-8'>
          <div className='mb-7 text-center text-h4-desktop font-semibold text-grey-800'>Lihat Juga</div>
          <CarouselC itemClass='md:basis-1/3 lg:basis-1/4 cursor-pointer'>
            {bidangUsaha.map((i) => (
              <div
                key={i.id}
                onClick={() => handleBidangUsahaClick(i)}
                className='mx-auto w-fit'
              >
                <div>
                  <Image
                    src={String(getAssets(i.image))}
                    alt='apartement'
                    layout='fixed'
                    width={276}
                    height={196}
                  />
                </div>
                <div className='text-center'>{i.title}</div>
              </div>
            ))}
          </CarouselC>
        </div>
      </div>
    </Blank>
  )
}

export default BidangUsahaId
