import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Language from '@/components/Language'
import Skeleton from '@/components/Skeleton'
import { ExampleBrowseSortBy } from '@/config/enum'
import Blank from '@/layouts/Blank'
import { useGetListExampleQuery } from '@/services/example'
import { ExampleBrowseRequest } from '@/types/example'

const ExampleList: FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'example'])

  const [query] = useState<ExampleBrowseRequest>({
    sortBy: ExampleBrowseSortBy.NameAsc,
    skip: 0,
    limit: 5,
  })

  const { data, isLoading } = useGetListExampleQuery(query)

  return (
    <Blank title={t('example:title')}>
      <main className='min-h-screen bg-gray-100'>
        <section className='mx-auto min-h-screen max-w-screen-sm bg-white py-10'>
          <div className='flex flex-row items-center justify-between px-6 text-center'>
            <h1 className='font-primary text-2xl font-bold md:text-4xl'>{t('example:title')}</h1>

            <Language />
          </div>

          <div className='flex flex-row justify-center'>
            <Link href={{ pathname: '/', query: { lang: router.query.lang } }}>
              <a className='mt-6 px-4 py-2 text-sm font-medium underline'>
                {t('common:backTo', { page: t('common:titles.home') })}
              </a>
            </Link>
          </div>

          <div className='mx-3 mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-1 lg:grid-cols-2'>
            {isLoading &&
              [1, 2, 3, 4].map((_, idx) => (
                <Skeleton
                  className='h-80 rounded-md'
                  key={idx}
                />
              ))}

            {data?.data?.items?.map((example) => (
              <div
                key={example.xid}
                className='group relative'
              >
                <div className='aspect-h-1 aspect-w-1 min-h-80 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                  <img
                    src={example.avatarUrl}
                    alt={example.name}
                    className='size-full object-cover object-center lg:size-full'
                    loading='lazy'
                  />
                </div>

                <div className='mt-4'>
                  <h3 className='text-sm text-gray-700'>
                    <Link href={{ pathname: `/examples/${example.xid}`, query: { lang: router.query.lang } }}>
                      <a>
                        <span
                          aria-hidden='true'
                          className='absolute inset-0'
                        />
                        {example.name}
                      </a>
                    </Link>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Blank>
  )
}

export default ExampleList
