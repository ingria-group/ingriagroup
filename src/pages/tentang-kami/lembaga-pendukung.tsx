import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { LembagaPendukungType } from '@/interface/AboutUsType'
import LembagaPendukung from '@/modules/aboutUs/LembagaPendukung/LembagaPendukung'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  lembagaPendukung: ApiResponse<LembagaPendukungType[]>
}> = async () => {
  const res = await fetch(baseUrl + 'lembaga_pendukung?fields[]=*,translations.*')
  const lembagaPendukung = await res.json()
  return { props: { lembagaPendukung } }
}

const PageLembagaPendukung = ({ lembagaPendukung }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <LembagaPendukung lembagaPendukung={lembagaPendukung.data} />
}

export default PageLembagaPendukung
