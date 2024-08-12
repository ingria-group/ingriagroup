import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { StrukturPerusahaanType } from '@/interface/AboutUsType'
import StrukturPerusahaan from '@/modules/aboutUs/StrukturPerusahaan/StrukturPerusahaan'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  strukturPerusahaan: ApiResponse<StrukturPerusahaanType[]>
}> = async () => {
  const res = await fetch(baseUrl + 'struktur_perusahaan?fields[]=*,translations.*')
  const strukturPerusahaan = await res.json()
  return { props: { strukturPerusahaan } }
}

const PageStrukturPerusahaan = ({ strukturPerusahaan }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <StrukturPerusahaan strukturPerusahaan={strukturPerusahaan.data} />
}

export default PageStrukturPerusahaan
