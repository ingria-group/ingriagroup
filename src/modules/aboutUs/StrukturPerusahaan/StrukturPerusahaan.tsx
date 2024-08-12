import Image from 'next/image'
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StrukturPerusahaanType } from '@/interface/AboutUsType'
import Blank from '@/layouts/Blank'
import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

interface StrukturPerusahaanProps {
  strukturPerusahaan: StrukturPerusahaanType[]
}

const StrukturPerusahaan: React.FC<StrukturPerusahaanProps> = ({ strukturPerusahaan }) => {
  const language = useLanguage()

  const tabsTrigger = strukturPerusahaan.map((i) => i.translations.find((i) => i.languages_code === language))
  return (
    <Blank title='Struktur Perusahaan'>
      <div className='container mx-auto'>
        <Tabs
          defaultValue={String(strukturPerusahaan[0].translations.find((i) => i.languages_code === language)?.title)}
          className='w-full'
        >
          <TabsList>
            {tabsTrigger.map((i) => (
              <TabsTrigger
                key={i?.id}
                value={String(i?.title)}
              >
                {i?.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {strukturPerusahaan.map((i) => (
            <TabsContent
              key={i?.id}
              value={String(i.translations.find((d) => d.languages_code === language)?.title)}
            >
              <Image
                src={String(getAssets(i.content))}
                alt='image'
                width={1000}
                height={800}
              />
            </TabsContent>
          ))}

          <TabsContent value='password'>Change your password here.</TabsContent>
        </Tabs>
      </div>
    </Blank>
  )
}

export default StrukturPerusahaan
