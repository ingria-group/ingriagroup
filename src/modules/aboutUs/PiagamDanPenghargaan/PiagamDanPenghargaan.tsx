import React from 'react'

import Blank from '@/layouts/Blank'

interface PiagamDanPenghargaanTranslations {
  id: number
  piagam_dan_penghargaan_id: number
  languages_code: string
  title: string
  caption: string
}
export interface PiagamDanPenghargaanType {
  id: number
  image: string
  translations: PiagamDanPenghargaanTranslations[]
}

interface PiagamDanPenghargaanProps {
  dataPiagam: PiagamDanPenghargaanType[]
}

const PiagamDanPenghargaan: React.FC<PiagamDanPenghargaanProps> = ({ dataPiagam }) => {
  console.log('ini data Piagam', dataPiagam)
  return (
    <Blank title='Piagam Penghargaan'>
      <div className='h-screen w-full bg-primary-900'>
        <div>Piagam dan Penghargaan</div>
      </div>
    </Blank>
  )
}

export default PiagamDanPenghargaan
