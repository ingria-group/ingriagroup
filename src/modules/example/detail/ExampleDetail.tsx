import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Language from '@/components/Language'
import Blank from '@/layouts/Blank'
import { useGetDetailExampleQuery } from '@/services/example'

const ExampleDetail: FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'example'])

  const { data } = useGetDetailExampleQuery(String(router.query.xid))

  return (
    <Blank title={data?.data.name || 'Loading...'}>
      <main className='min-h-screen bg-gray-100'>
        <section className='mx-auto min-h-screen max-w-screen-sm bg-white py-10'>
          <div className='flex flex-row items-center justify-between px-6 text-center'>
            <h1 className='font-primary text-2xl font-bold md:text-4xl'>{data?.data?.name || 'Loading...'}</h1>

            <Language />
          </div>

          <div className='flex flex-row justify-center'>
            <Link href={{ pathname: '/examples', query: { lang: router.query.lang } }}>
              <a className='mt-6 px-4 py-2 text-sm font-medium underline'>
                {t('common:backTo', { page: t('common:titles.example') })}
              </a>
            </Link>
          </div>

          <div className='mx-3 mt-6 grid w-full place-items-center'>
            <div className='group relative'>
              <div className='aspect-h-1 aspect-w-1 size-80 overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80'>
                <img
                  src={data?.data?.avatarUrl}
                  alt={data?.data?.name}
                  className='size-full object-cover object-center lg:size-full'
                  loading='lazy'
                />
              </div>

              <div className='mt-4 text-center'>
                <h3 className='text-sm text-gray-700'>{data?.data?.name || 'Loading...'}</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Blank>
  )
}

export default ExampleDetail
