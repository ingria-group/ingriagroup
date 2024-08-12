import { ArrowLeft, MapPin } from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ContentType } from '@/modules/karir/list/Career'

import { Separator } from './ui/separator'

interface AccordionTempProps {
  id: number
  title: string
  place: string
  content: ContentType | undefined // Handle undefined content type
}

const AccordionTemp: React.FC<AccordionTempProps> = ({ title, content, id, place }) => {
  const router = useRouter()

  const handleAccordionClick = () => {
    router.push({
      pathname: `/karir/${id}`,
      query: { title, place, content: encodeURIComponent(JSON.stringify(content)) },
    })
  }

  // // Log content for debugging
  // console.log(`Accordion Item ${id} Content:`, content)

  return (
    <AccordionItem
      value={String(id)}
      onClick={handleAccordionClick}
    >
      <AccordionTrigger>
        <div className='grid grid-flow-row gap-3'>
          <div className='text-start text-body-desktop-large font-medium'>{title}</div>
          <div className='grid grid-flow-col gap-3'>
            <MapPin />
            <div className='text-body-desktop-regular'>{place}</div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className='grid grid-cols-3'>
          <div className='col-span-2 grid grid-rows-3 gap-7'>
            <div className='grid h-fit w-full grid-flow-row gap-6'>
              <div>
                <ArrowLeft />
              </div>
              <h4 className='text-h4-desktop font-semibold'>{title}</h4>
              <div className='flex flex-row gap-3 text-body-desktop-large'>
                <MapPin />
                <div className=''>{place}</div>
              </div>
            </div>
            <div>
              <div className='mb-5 grid grid-flow-col'>
                <div className='text-h6-desktop font-bold '>Kualifikasi</div>
                <Separator className='col-span-11 my-auto h-1' />
              </div>
              <ul className='mx-5 list-disc text-body-desktop-regular'>
                {/* Ensure content and kualifikasi are defined */}
                {content?.kualifikasi ? (
                  content.kualifikasi.map((i) => <li key={i.id}>{i.value}</li>)
                ) : (
                  <li>Kualifikasi not available</li>
                )}
              </ul>
            </div>
            <div>
              <div className='mb-5 grid grid-flow-col'>
                <div className='text-h6-desktop font-bold'>Tugas dan Tanggung Jawab </div>
                <Separator className='col-span-11 my-auto h-1' />
              </div>
              <ul className='mx-5 list-disc text-body-desktop-regular'>
                {/* Ensure content and responsibility are defined */}
                {content?.responsibility ? (
                  content.responsibility.map((i) => <li key={i.id}>{i.value}</li>)
                ) : (
                  <li>Responsibility not available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

interface AccordionBoxProps {
  items: AccordionTempProps[]
}

const AccordionBox: React.FC<AccordionBoxProps> = ({ items }) => (
  <Accordion
    type='single'
    collapsible
  >
    {items.map(({ id, title, content, place }) => (
      <AccordionTemp
        place={place}
        key={id}
        title={title}
        content={content}
        id={id}
      />
    ))}
  </Accordion>
)

export default AccordionBox
