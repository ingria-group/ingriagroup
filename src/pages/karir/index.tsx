import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import Career, { DataCareer } from '@/modules/karir/list/Career'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  dataListKarir: ApiResponse<DataCareer>
}> = async () => {
  const res = await fetch(
    baseUrl +
      'data_career?fields[]=*,accordionItems.translations.*&fields[]=*,translations.*&fields[]=*,accordionItems.*&fields[]=*,accordionItems.translations.content.*&fields[]=*,accordionItems.translations.content.responsibility.*&fields[]=*,accordionItems.translations.content.kualifikasi.*'
  )
  const dataListKarir = await res.json()
  return { props: { dataListKarir } }
}

const PageKarir = ({ dataListKarir }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Career dataListKarir={dataListKarir.data} />
}

export default PageKarir
