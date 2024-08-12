import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { TataKelolaType } from '@/interface/TataKelolaPeusahaanType'
import TataKelolaPerusahaan from '@/modules/tataKelolaPerusahaan'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  tataKelola: ApiResponse<TataKelolaType>
}> = async () => {
  const res = await fetch(baseUrl + 'data_tata_kelola?fields[]=*,translations.*')
  const tataKelola = await res.json()
  return { props: { tataKelola } }
}

const PageTataKelola = ({ tataKelola }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <TataKelolaPerusahaan tataKelola={tataKelola.data} />
}

export default PageTataKelola
