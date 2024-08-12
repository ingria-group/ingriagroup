import Image from 'next/image'
import React from 'react'

import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

export interface YouTrustedRealTranslations {
  id: number
  title: string
  real_estate_id: number
  languages_code: string
  description: string
}
export interface YouTrustedRealType {
  id: number
  image: string
  translations: YouTrustedRealTranslations[]
}

interface YouTrustedRealProps {
  dataYouTrustedReal: YouTrustedRealType
}

const YouTrustedReal: React.FC<YouTrustedRealProps> = ({ dataYouTrustedReal }) => {
  const language = useLanguage()
  const dataTranslation = dataYouTrustedReal.translations.find((i) => i.languages_code === language)
  return (
    <div className='container mx-auto w-full pb-4 pt-9 sm:px-2 md:px-4 md:py-9'>
      <div className='grid grid-cols-1 gap-7 md:grid-cols-8'>
        <div className='w-full md:col-span-3'>
          <Image
            src={String(getAssets(dataYouTrustedReal.image))}
            width={680}
            height={480}
            alt='house'
            className='h-auto w-full'
          />
        </div>
        <div className='box-content flex flex-col gap-7 p-2 md:col-span-4 md:col-start-5'>
          <div className='text-h3-mobile font-semibold md:text-h3-desktop'>{dataTranslation?.title}</div>
          <div className='text-body-mobile-regular md:text-body-desktop-regular'>{dataTranslation?.description}</div>
        </div>
      </div>
    </div>
  )
}

export default YouTrustedReal
