import Image from 'next/image'
import React from 'react'

import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

export interface OurBusinessTranlations {
  id: number
  our_business_id: number
  languages_code: string
  title: string
}

export interface OurBusinessLogo {
  id: number
  our_business_id: number
  directus_files_id: string
}
export interface OurBusinessType {
  id: number
  translations: OurBusinessTranlations[]
  logo: OurBusinessLogo[]
}

interface OurBusinessProps {
  dataOurBusiness: OurBusinessType
}

const OurBusiness: React.FC<OurBusinessProps> = ({ dataOurBusiness }) => {
  const language = useLanguage()
  const dataTranslation = dataOurBusiness.translations.find((i) => i.languages_code === language)
  return (
    <div className='container mx-auto w-full p-4 md:px-0 md:py-9'>
      <div className='grid w-full grid-cols-1 md:grid-cols-5'>
        <div className='mb-7 text-center text-h4-mobile font-semibold md:col-start-3 md:text-h4-desktop'>
          {dataTranslation?.title}
        </div>
      </div>
      <div className='flex flex-wrap justify-center gap-4 md:gap-7'>
        {dataOurBusiness?.logo.map((i) => (
          <div
            key={i.id}
            className='w-40 md:w-64'
          >
            <Image
              src={String(getAssets(i.directus_files_id))}
              alt='logo'
              width={280}
              height={200}
              className='h-auto w-full'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurBusiness
