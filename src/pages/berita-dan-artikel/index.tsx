import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { BeritaDanArtikelType } from '@/interface/BeritaDanArtikelType'
import BeritaDanArtikel from '@/modules/beritaDanArtikel/list'
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

const PageBidangArtikelList = ({ beritaArtikel }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <BeritaDanArtikel beritaArtikel={beritaArtikel.data} />
}

export default PageBidangArtikelList
