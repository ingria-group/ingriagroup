import Image from 'next/image'
import React from 'react'

import { TentangPerjalananKamiType } from '@/interface/AboutUsType'
import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

interface TentangPerjalananKamiProps {
  tentangPerjalananKami: TentangPerjalananKamiType
}

const TentangPerjalananKami: React.FC<TentangPerjalananKamiProps> = ({ tentangPerjalananKami }) => {
  const language = useLanguage()
  const dataTranslation = tentangPerjalananKami.translations.find((i) => i.languages_code === language)
  return (
    <div className='container mx-auto text-grey-800'>
      <div className='mb-7'>
        <div className='mb-6 grid grid-cols-1 sm:grid-cols-5'>
          <h4 className='col-span-5 text-left text-h4-desktop font-semibold sm:col-span-1'>{dataTranslation?.title}</h4>
        </div>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
          <div className='sm:order-2'>
            <Image
              src={String(getAssets(tentangPerjalananKami?.image))}
              alt='office'
              width={650}
              height={370}
              className='size-full object-cover'
            />
          </div>
          <p className='text-body-desktop-regular sm:order-1'>{dataTranslation?.description}</p>
        </div>
      </div>
      <div className='w-full'>
        <Image
          src={String(getAssets(tentangPerjalananKami?.bannerImage))}
          alt='bannerImage'
          layout='responsive'
          width={500} // Provide a width value, adjust it according to your needs
          height={100} // Provide a height value, adjust it according to your needs
          className='w-full'
        />
      </div>
    </div>
  )
}

export default TentangPerjalananKami
