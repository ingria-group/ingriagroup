import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import PiagamDanPenghargaan, {
  PiagamDanPenghargaanType,
} from '@/modules/aboutUs/PiagamDanPenghargaan/PiagamDanPenghargaan'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  dataPiagam: ApiResponse<PiagamDanPenghargaanType[]>
}> = async () => {
  const res = await fetch(baseUrl + 'piagam_dan_penghargaan?fields[]=*,translations.*')
  const dataPiagam = await res.json()
  return { props: { dataPiagam } }
}

const PagePiagamPenghargaan = ({ dataPiagam }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <PiagamDanPenghargaan dataPiagam={dataPiagam.data} />
}

export default PagePiagamPenghargaan
