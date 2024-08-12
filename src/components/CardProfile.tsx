import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnggotaPerusahaanSubData } from '@/interface/AboutUsType'

const CardProfile: React.FC<AnggotaPerusahaanSubData> = ({ name, riwayat, role }) => {
  return (
    <Card className='h-fit text-grey-800 shadow-lg'>
      <CardHeader>
        <div className='mb-6 text-center'>
          <CardTitle className='mb-2 font-extrabold sm:text-h6-desktop'>{name}</CardTitle>
          <CardDescription className='font-bold sm:text-h6-desktop'>{role}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4'>
          <div>
            <h6 className='mb-4 text-body-desktop-regular font-bold'>Biografi & riwayat pendidikan</h6>
            <p className='text-body-desktop-regular font-normal'>{riwayat[0].pendidikan}</p>
          </div>
          <div>
            <h6 className='mb-4 text-body-desktop-regular font-bold'>Riwayat Jabatan</h6>
            <p className='text-body-desktop-regular font-normal'>{riwayat[0].jabatan}</p>
          </div>
          <div>
            <h6 className='mb-4 text-body-desktop-regular font-bold'>Hubungan Afiliasi</h6>
            <p className='text-body-desktop-regular font-normal'>{riwayat[0].afiliasi}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardProfile
