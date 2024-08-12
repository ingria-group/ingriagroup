import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { DokumenAnggaranPasarType } from '@/interface/AboutUsType'
import DokumenAnggaranPasar from '@/modules/aboutUs/DokumenAnggaranPasar/DokumenAnggaranPasar'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  dokumenAnggaranPasar: ApiResponse<DokumenAnggaranPasarType[]>
}> = async () => {
  const res = await fetch(baseUrl + 'dokumen_anggaran_pasar?fields[]=*,translations.*')
  const dokumenAnggaranPasar = await res.json()
  return { props: { dokumenAnggaranPasar } }
}

const PageDokumenAnggaranPasar = ({ dokumenAnggaranPasar }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <DokumenAnggaranPasar dokumenAnggaranPasar={dokumenAnggaranPasar.data} />
}

export default PageDokumenAnggaranPasar
