import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BeritaDanArtikelType } from '@/interface/BeritaDanArtikelType'
import Blank from '@/layouts/Blank'
import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

export interface BeritaDanArtikelProps {
  beritaArtikel: BeritaDanArtikelType[]
}

const BeritaDanArtikel: React.FC<BeritaDanArtikelProps> = ({ beritaArtikel }) => {
  const dataBerita: BeritaDanArtikelType[] = beritaArtikel
  const router = useRouter()
  const language = useLanguage()
  const [intialTabs, setIntialTabs] = useState(null)
  const dataTranslation = beritaArtikel.map((i) => i.translations.find((d) => d.languages_code === language))

  const handleItemClick = (path: string, id: any) => {
    router.push(`/berita-dan-artikel/${path}/${id}`)
  }

  if (!dataTranslation) {
    return <div>Loading...</div>
  }

  console.log(dataTranslation)
  return (
    <Blank title='Berita Dan Artikel'>
      <div className='container mx-auto px-4'>
        <Tabs
          defaultValue={dataTranslation[0]?.title}
          className='w-full'
        >
          <TabsList className='mb-4 flex flex-wrap justify-start'>
            {dataBerita.map((i) => {
              const dataTranslation = i.translations.find((d) => d.languages_code === language)
              return (
                <TabsTrigger
                  key={dataTranslation?.id}
                  value={dataTranslation?.title || ''}
                >
                  {dataTranslation?.title}
                </TabsTrigger>
              )
            })}
          </TabsList>
          {dataBerita.map((i) => {
            const dataTranslation = i.translations.find((d) => d.languages_code === language)
            return (
              <TabsContent
                value={dataTranslation?.title || ''}
                key={dataTranslation?.id}
              >
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                  {dataTranslation?.data.map((v) => (
                    <div
                      key={v.id}
                      className='relative box-content p-2'
                      onClick={() => handleItemClick(i.path, v.id)}
                    >
                      <div className='relative h-48 w-full sm:h-64'>
                        <Image
                          src={String(getAssets(v.image))}
                          layout='fill'
                          objectFit='cover'
                          alt='image'
                          className='rounded-lg'
                        />
                      </div>
                      <div className='mt-2 text-lg font-bold sm:text-xl'>{v.title}</div>
                      <div
                        className='line-clamp-4 text-sm sm:text-base'
                        dangerouslySetInnerHTML={{ __html: v.content[0].htmlContent }}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </Blank>
  )
}

export default BeritaDanArtikel
