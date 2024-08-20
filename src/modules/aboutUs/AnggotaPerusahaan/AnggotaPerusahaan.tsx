import React, { useEffect, useState } from 'react'

import CardProfile from '@/components/CardProfile'
import { Separator } from '@/components/ui/separator'
import { AnggotaPerusahaanSubData, AnggotaPerusahaanType, DewanKomiteType } from '@/interface/AboutUsType'
import Blank from '@/layouts/Blank'
import { cn } from '@/lib/utils'
import useLanguage from '@/utils/useLanguage'

interface AnggotaPerusahaanProps {
  anggotaPerusahaanData: AnggotaPerusahaanType[]
  dewanKomiteData: DewanKomiteType
}

const AnggotaPerusahaan: React.FC<AnggotaPerusahaanProps> = ({ anggotaPerusahaanData, dewanKomiteData }) => {
  const language = useLanguage()
  const dataTransalationsAnggota = anggotaPerusahaanData.map((i) =>
    i.translations.find((d) => d.languages_code === language)
  )
  const dataTransalationsKomite = dewanKomiteData.translations.find((i) => i.languages_code === language)
  const firstData = dataTransalationsAnggota[0]?.data[0]

  const [clickProfile, setClickProfile] = useState<AnggotaPerusahaanSubData | null>(null)

  useEffect(() => {
    if (firstData) {
      setClickProfile(firstData)
    }
  }, [firstData])

  const handleClickProfile = (data: AnggotaPerusahaanSubData) => {
    setClickProfile(data)
  }

  if (!clickProfile) {
    return null // or a loading state
  }

  return (
    <Blank title='Anggota Perusahaan'>
      <div className='container mx-auto mb-9 px-4'>
        <h4 className='mb-7 text-h4-mobile font-semibold text-grey-800 sm:text-h4-desktop'>Anggota Perusahaan</h4>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='my-7 block sm:hidden'>
            <CardProfile
              name={clickProfile.name}
              riwayat={clickProfile.riwayat}
              role={clickProfile.role}
              id={clickProfile.id}
            />
          </div>
          <div className='grid grid-flow-row gap-7'>
            {dataTransalationsAnggota.map((i) => (
              <div
                className='mb-7 grid grid-flow-row gap-7 text-grey-800'
                key={i?.id}
              >
                <div className='grid h-fit grid-flow-col items-center'>
                  <h5 className='text-h5-mobile font-semibold sm:text-h5-desktop'>{i?.title}</h5>
                  <Separator className='col-span-12' />
                </div>
                <div className='flex flex-wrap gap-6'>
                  {i?.data.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => handleClickProfile(d)}
                      className='cursor-pointer'
                    >
                      <div
                        className={cn(
                          'box-content h-8 w-64 rounded-xl px-5 py-6 shadow-xl',
                          clickProfile.id === d.id ? 'border-2 border-primary-600' : ''
                        )}
                      >
                        <div className='text-subtle-mobile font-medium md:text-subtle-desktop'>{d.role}</div>
                        <h6 className='text-h6-mobile md:text-h6-desktop'>{d.name}</h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div
              className='text-grey-800'
              key={dataTransalationsKomite?.id}
            >
              {/* ... (rest of the code remains the same) ... */}
            </div>
          </div>
          <div className='hidden sm:block'>
            <CardProfile
              name={clickProfile.name}
              riwayat={clickProfile.riwayat}
              role={clickProfile.role}
              id={clickProfile.id}
            />
          </div>
        </div>
      </div>
    </Blank>
  )
}

export default AnggotaPerusahaan
