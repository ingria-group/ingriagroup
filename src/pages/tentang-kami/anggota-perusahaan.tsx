import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { AnggotaPerusahaanType, DewanKomiteType } from '@/interface/AboutUsType'
import AnggotaPerusahaan from '@/modules/aboutUs/AnggotaPerusahaan/AnggotaPerusahaan'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  anggotaPerusahaanData: ApiResponse<AnggotaPerusahaanType[]>
  dewanKomiteData: ApiResponse<DewanKomiteType>
}> = async () => {
  const urls = [
    baseUrl + 'anggota_perusahaan?fields[]=*,translations.*',
    baseUrl + 'data_dewan_komite?fields[]=*,translations.*',
  ]

  const [anggotaPerusahaanData, dewanKomiteData] = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
  )
  return { props: { anggotaPerusahaanData, dewanKomiteData } }
}

const perusahaanAnggota = ({
  anggotaPerusahaanData,
  dewanKomiteData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AnggotaPerusahaan
      anggotaPerusahaanData={anggotaPerusahaanData.data}
      dewanKomiteData={dewanKomiteData.data}
    />
  )
}

export default perusahaanAnggota
