import { ArrowLeft, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import CareerForm from '@/components/CareerForm'

import { ContentType } from '../list/Career'
import { Separator } from '../../../components/ui/separator'

const KarirIdPage = () => {
  const router = useRouter()
  const { title, place, content } = router.query

  const [parsedContent, setParsedContent] = useState<ContentType | null>()

  useEffect(() => {
    if (router.isReady && content) {
      try {
        const decodedContent = decodeURIComponent(content as string)
        const parsedArray = JSON.parse(decodedContent)

        // Assuming the first element of the array is what you need
        if (Array.isArray(parsedArray) && parsedArray.length > 0) {
          const parsed = parsedArray[0] // Access the first item
          setParsedContent(parsed)
        } else {
          console.warn('Content is not an array or is empty')
          setParsedContent(null)
        }
      } catch (error) {
        console.error('Error parsing content:', error)
        setParsedContent(null)
      }
    }
  }, [router.isReady, content])

  return (
    <>
      <div className='grid grid-cols-3'>
        <div className='col-span-2 grid grid-rows-3 gap-7'>
          <div className='grid h-fit w-full grid-flow-row gap-6'>
            <Link
              href='/karir'
              className='cursor-pointer'
            >
              <ArrowLeft />
            </Link>
            <h4 className='text-h4-desktop font-semibold'>{title}</h4>
            <div className='flex flex-row gap-3 text-body-desktop-large'>
              <MapPin />
              <div className=''>{place}</div>
            </div>
          </div>
          {parsedContent === null ? (
            <div>data null</div>
          ) : (
            <>
              <div>
                <div className='mb-5 grid grid-flow-col'>
                  <div className='text-h6-desktop font-bold '>Kualifikasi</div>
                  <Separator className='col-span-11 my-auto h-1' />
                </div>
                <ul className='mx-5 list-disc text-body-desktop-regular'>
                  {parsedContent?.kualifikasi?.length ? (
                    parsedContent.kualifikasi.map((i) => <li key={i.id}>{i.value}</li>)
                  ) : (
                    <li>No qualifications available</li>
                  )}
                </ul>
              </div>
              <div>
                <div className='mb-5 grid grid-flow-col'>
                  <div className='text-h6-desktop font-bold '>Tugas dan Tanggung Jawab </div>
                  <Separator className='col-span-11 my-auto h-1' />
                </div>
                <ul className='mx-5 list-disc text-body-desktop-regular'>
                  {parsedContent?.responsibility?.length ? (
                    parsedContent.responsibility.map((i) => <li key={i.id}>{i.value}</li>)
                  ) : (
                    <li>No qualifications available</li>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
        <CareerForm title='Aplikasi Pekerjaan' />
      </div>
    </>
  )
}

export default KarirIdPage
