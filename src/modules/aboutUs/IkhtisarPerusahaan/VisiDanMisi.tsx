import Image from 'next/image'

import { VisiDanMisiType } from '@/interface/AboutUsType'
import getAssets from '@/utils/getAssets'
import Icons from '@/utils/Icons'
import useLanguage from '@/utils/useLanguage'

interface VisiDanMisiProps {
  visiDanMisi: VisiDanMisiType
}

const VisiDanMisi: React.FC<VisiDanMisiProps> = ({ visiDanMisi }) => {
  const language = useLanguage()
  const dataTranslation = visiDanMisi.translations.find((i) => i.languages_code === language)
  return (
    <div className='h-fit w-full bg-gradient-to-b from-white from-30% to-primary-700 to-30% pt-7'>
      <div className='container relative mx-auto px-6 py-5'>
        {/* Bagian Konten Utama */}
        <div className='relative z-10 rounded-full'>
          <div className='grid gap-7 text-grey-300 sm:grid-rows-2 sm:gap-7'>
            <div className='flex flex-col items-center justify-end gap-4 text-center'>
              <h6 className='text-h6-mobile font-bold sm:text-h6-desktop'>{dataTranslation?.title}</h6>
              <div className='text-h5-mobile font-bold sm:text-h5-desktop'>{dataTranslation?.description}</div>
            </div>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6'>
              {dataTranslation?.itemMission.map((i) => (
                <div
                  className='box-content rounded-xl bg-gray-900 px-6 py-5 text-body-mobile-regular sm:text-body-desktop-regular'
                  key={i.id}
                >
                  <div className='font-bold'>{i.title}</div>
                  <div>{i.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bagian Gambar Latar Belakang */}
        <div className='absolute inset-0 z-0'>
          <Image
            src={String(getAssets(visiDanMisi.image))}
            alt='image'
            layout='fill'
            objectFit='cover'
            className='rounded-xl'
          />
        </div>
        <div className='absolute inset-0 rounded-xl bg-grey-800 opacity-80' />
      </div>

      {/* Bagian Subjudul dan Ikon */}
      <div className='mx-auto mt-9 text-center text-grey-300'>
        <h3 className='mb-8 text-h3-mobile font-semibold sm:text-h3-desktop'>{dataTranslation?.subtitle}</h3>
        <div className='grid grid-cols-2 gap-5 px-4 sm:grid-cols-5 sm:gap-5 sm:px-10'>
          {dataTranslation?.itemSub.map((i) => (
            <div
              key={i.id}
              className='grid grid-rows-2 gap-5'
            >
              <div className='text-center'>
                <h6 className='mb-4 text-h6-desktop font-extrabold sm:text-h6-desktop'>{i.title}</h6>
                <p className='text-body-mobile-regular sm:text-body-desktop-regular'>{i.description}</p>
              </div>
              <div className='mx-auto'>
                <Icons
                  name={i.icon}
                  color='white'
                  size={60}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VisiDanMisi
