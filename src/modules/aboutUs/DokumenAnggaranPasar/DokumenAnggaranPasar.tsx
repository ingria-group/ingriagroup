import { Download } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { DokumenAnggaranPasarType } from '@/interface/AboutUsType'
import Blank from '@/layouts/Blank'
import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

interface DokumenAnggaranPasarProps {
  dokumenAnggaranPasar: DokumenAnggaranPasarType[]
}

const DokumenAnggaranPasar: React.FC<DokumenAnggaranPasarProps> = ({ dokumenAnggaranPasar }) => {
  const language = useLanguage()
  const [selectFile, setSelectFile] = useState(dokumenAnggaranPasar[0].file)
  const [active, setActive] = useState(dokumenAnggaranPasar[0].id)

  const handleClickFile = (dataFile: string, id: number) => {
    setActive(id)
    setSelectFile(dataFile)
  }
  return (
    <Blank title='Dokumen Anggaran Pasar'>
      <div className='container mx-auto px-4'>
        <h4 className='mb-6 text-h4-mobile font-semibold sm:text-h4-desktop'>Dokumen Anggaran Pasar</h4>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
          <div className='flex flex-col'>
            {dokumenAnggaranPasar.map((i) => (
              <div
                className='cursor-pointer border-b-2'
                key={i.id}
                onClick={() => handleClickFile(i.file, i.id)}
              >
                <div
                  className={`flex flex-row items-center justify-between py-4 ${
                    i.id === active ? 'text-primary-600' : ''
                  }`}
                >
                  <div className='text-body-mobile sm:text-body-desktop'>
                    {i.translations.find((i) => i.languages_code === language)?.title}
                  </div>
                  <a
                    href={i.file}
                    download='sample.pdf'
                  >
                    <Button
                      variant='tertiary'
                      size='iconSm'
                      icon={<Download color='grey' />}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className='box-content rounded-2xl pb-6 pt-7 shadow-lg sm:px-6'>
            <embed
              src={String(getAssets(selectFile))}
              type='application/pdf'
              width='100%'
              height='600px'
              // className='sm:height-[600px]'
            />
          </div>
        </div>
      </div>
    </Blank>
  )
}

export default DokumenAnggaranPasar
