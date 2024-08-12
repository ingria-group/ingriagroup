import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { BeritaDanArtikelType } from '@/interface/BeritaDanArtikelType'
import BeritaDanArtikelId from '@/modules/beritaDanArtikel/detail'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  beritaArtikel: ApiResponse<BeritaDanArtikelType[]>
}> = async () => {
  const res = await fetch(baseUrl + 'Berita_dan_artikel?fields[]=*,translations.*,translations.data.*')
  const beritaArtikel = await res.json()
  return { props: { beritaArtikel } }
}

const PageBidangArtikel = ({ beritaArtikel }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <BeritaDanArtikelId beritaArtikel={beritaArtikel.data} />
}

export default PageBidangArtikel
