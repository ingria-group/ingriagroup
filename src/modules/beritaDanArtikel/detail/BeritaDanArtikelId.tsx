import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import Blank from '@/layouts/Blank'
import useLanguage from '@/utils/useLanguage'

import { BeritaDanArtikelProps } from '../list/BeritaDanArtikel'

const BeritaDetail: React.FC<BeritaDanArtikelProps> = ({ beritaArtikel }) => {
  const router = useRouter()
  const language = useLanguage()
  const { id, path } = router.query
  const dataBerita = beritaArtikel.find((p) => p.path === path)
  const dataTranslation = dataBerita?.translations.find((l) => l.languages_code === language)
  const datas = dataTranslation?.data.find((i) => i.id.toString() === id?.toString())
  const handleItemClick = (id: number) => {
    router.push(`/berita-dan-artikel/${path}/${id}`)
  }

  return (
    <Blank title='Berita dan Artikel id'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-7 pb-9 md:grid-cols-8'>
          <div className='md:col-span-6 md:border-r-2 md:border-grey-500'>
            <div className='flex flex-col gap-7 pr-0 md:pr-7'>
              <div className='text-h6-mobile placeholder:text-slate-500 sm:text-h6-desktop'>Artikel</div>
              <div className='relative h-48 w-full sm:h-64'>
                <Image
                  layout='fill'
                  objectFit='contain'
                  alt='image'
                  src={'https://ingria.fly.dev/assets/' + datas?.image || '/assets/image/blank.png'}
                />
              </div>
              <div className='text-h4-mobile font-semibold sm:text-h4-desktop'>{datas?.title}</div>
              {datas?.content.map((data) => (
                <div key={data.id}>
                  <div className='text-h5-desktop sm:text-h5-desktop'>{data.title}</div>
                  <p
                    className='text-body-mobile-regular sm:text-body-desktop-regular'
                    dangerouslySetInnerHTML={{ __html: data.htmlContent }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='md:col-span-2'>
            <div className='mb-3 text-h6-mobile sm:text-h6-desktop'>Artikel Lainnya</div>
            <div className='flex flex-col gap-7'>
              {dataTranslation?.data.slice(2, 6).map((v) => (
                <div
                  key={v.id}
                  className='relative box-content cursor-pointer p-2'
                  onClick={() => handleItemClick(v.id)}
                >
                  <div className='mt-2 text-lg font-bold sm:text-xl'>{v.title}</div>
                  <div
                    className='line-clamp-4 text-sm sm:text-base'
                    dangerouslySetInnerHTML={{ __html: v.content[0].htmlContent }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Blank>
  )
}

export default BeritaDetail
