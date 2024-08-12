import React from 'react'

import { PiagamAuditInternalType } from '@/interface/AboutUsType'
import Blank from '@/layouts/Blank'
import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

interface PiagamAuditInternalProps {
  piagamAuditInternal: PiagamAuditInternalType
}

const PiagamAuditInternal: React.FC<PiagamAuditInternalProps> = ({ piagamAuditInternal }) => {
  const language = useLanguage()
  const dataTranslation = piagamAuditInternal.translations.find((i) => i.languages_code === language)

  return (
    <Blank title='Piagam Audit'>
      <div className='container mx-auto'>
        <h4 className='mb-6 text-h4-mobile font-semibold sm:text-h4-desktop'>{dataTranslation?.title}</h4>
        <div className='grid gap-8 sm:grid-cols-2'>
          <div className='text-body-mobile-regular sm:text-body-desktop-regular'>{dataTranslation?.description}</div>

          <div>
            <h5 className='mb-2'>File Preview</h5>
            <embed
              src={String(getAssets(piagamAuditInternal?.file))}
              type='application/pdf'
              width='100%'
              height='400px' // Atur ulang tinggi embed untuk tampilan mobile
              className='sm:h-600' // Gunakan sm:h-600 untuk mengembalikan tinggi di desktop
            />
            <a
              href={String(getAssets(piagamAuditInternal?.file))}
              download='sample.pdf'
              className='mt-2 block text-blue-500 hover:underline'
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </Blank>
  )
}

export default PiagamAuditInternal
