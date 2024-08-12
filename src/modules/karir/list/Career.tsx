import React from 'react'

import AccordionBox from '@/components/AccordionBox'
import Blank from '@/layouts/Blank'
import useLanguage from '@/utils/useLanguage'

export interface ContentType {
  kualifikasi: { id: number; value: string }[]
  responsibility: { id: number; value: string }[]
}

export interface AccordionsItems {
  id: number
  content_data_id: number
  value: string
}

interface TranslationsAccordions {
  id: number
  sub_data_career_id: number
  languages_code: string
  content: { id: number; content_id: number; responsibility: AccordionsItems[]; kualifikasi: AccordionsItems[] }
}

export interface DataCareer {
  id: number
  translations: { id: number; data_career_id: number; languages_code: string; title: string }[]
  title: string
  accordionItems: {
    id: number
    data_career_id: number
    place: string
    title: string
    translations: TranslationsAccordions[]
    content: ContentType
  }[]
}

interface CareerProps {
  dataListKarir: DataCareer
}

const Career: React.FC<CareerProps> = ({ dataListKarir }) => {
  const language = useLanguage()
  const title = dataListKarir.translations.find((d) => d.languages_code === language)?.title
  const accordionData = dataListKarir.accordionItems
    .map((item) => {
      const filterLanguages = item.translations.filter((t) => t.languages_code === language)
      return {
        id: item.id,
        title: item.title,
        place: item.place,
        content: filterLanguages[0]?.content,
      }
    })
    .filter((item) => item.content !== undefined)

  return (
    <Blank title='Karir'>
      <div className='container mx-auto my-6 w-full'>
        <div className='mb-8'>
          <h4 className='mb-6 w-full text-h4-desktop font-semibold'>{title}</h4>
          <AccordionBox items={accordionData} />
        </div>
      </div>
    </Blank>
  )
}

export default Career
