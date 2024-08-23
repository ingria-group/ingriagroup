import Image from 'next/image'
import React, { useState } from 'react'

import TabCard from '@/components/TabCard'
import getAssets from '@/utils/getAssets'
import Icons from '@/utils/Icons'
import useLanguage from '@/utils/useLanguage'

export interface TranslationsDataFind {
  id: number
  title: string
  description: string
  languages_code: string
}
export interface DataFindType {
  activeImage: string
  hoverImage: string
  translations: TranslationsDataFind[]
  icon_list: { id: number; title: string; icon: string }[]
}
interface FindThePerfectHomeProps {
  findPerfectData: DataFindType
}

const FindThePerfectHome: React.FC<FindThePerfectHomeProps> = ({ findPerfectData }) => {
  const language = useLanguage()
  const dataTranslation = findPerfectData.translations.find((i) => i.languages_code === language)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className='ml-4 box-content grid w-full grid-cols-1 gap-4 lg:ml-10 lg:grid-cols-7'>
      <div className='md:col-span-2'>
        <div className='mb-8 flex flex-col gap-7'>
          <div className='text-h1-mobile font-extrabold md:text-h1-desktop'>{dataTranslation?.title}</div>
          <div className='text-body-mobile-large md:text-body-desktop-large'>{dataTranslation?.description}</div>
        </div>
        <div className='w-full'>
          <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className='col-span-2 grid grid-cols-2 gap-3'>
              {findPerfectData?.icon_list.map((i) => (
                <TabCard
                  key={i.id}
                  icon={
                    <Icons
                      name={i.icon}
                      color='#82B4E0'
                      size={20}
                    />
                  }
                  title={i.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='grid md:col-span-5 md:mt-6 md:grid-rows-4'>
        <div className='row-span-2 md:row-span-5 md:row-start-1'>
          <Image
            src={String(getAssets(isHovered ? findPerfectData?.hoverImage : findPerfectData?.activeImage))}
            width={1200}
            height={700}
            alt='gambar'
            className='object-contain transition-opacity duration-500 hover:opacity-100'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default FindThePerfectHome
