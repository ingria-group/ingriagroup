import { Phone } from 'lucide-react'
import React from 'react'

import { LembagaPendukungType } from '@/interface/AboutUsType'
import Blank from '@/layouts/Blank'
import useLanguage from '@/utils/useLanguage'

interface LembagaPendukungProps {
  lembagaPendukung: LembagaPendukungType[]
}

const LembagaPendukung: React.FC<LembagaPendukungProps> = ({ lembagaPendukung }) => {
  const language = useLanguage()
  return (
    <Blank title='Lembaga Pendukung'>
      <div className='container mx-auto'>
        <h4 className='mb-7 text-h4-desktop font-semibold'>Lembaga Pendukung dan Pasar Modal</h4>
        <div className='grid grid-flow-row gap-5 sm:grid-flow-col'>
          {lembagaPendukung.map((i) => {
            const dataTranslation = i.translations.find((i) => i.languages_code === language)
            return (
              <div
                className='box-content grid grid-flow-row gap-4 rounded-lg bg-grey-100 px-6 pb-5 pt-6'
                key={i.id}
              >
                <div className='flex w-full flex-row justify-between'>
                  <h6 className='text-body-desktop-large text-primary-800'>{dataTranslation?.title}</h6>
                  <Phone width={50} />
                </div>
                <div className='text-subtle-desktop'>{dataTranslation?.contact}</div>
                <div className='text-body-desktop-regular'>{dataTranslation?.address}</div>
              </div>
            )
          })}
        </div>
      </div>
    </Blank>
  )
}

export default LembagaPendukung
