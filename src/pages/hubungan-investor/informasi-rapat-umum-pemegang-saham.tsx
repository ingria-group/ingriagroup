import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import {
  BahanMataAcaraType,
  PengumumanDanPemanggilanType,
  RingkasanRisalahType,
} from '@/interface/HubunganInvestorType'
import InformasiRapatUmum from '@/modules/hubunganInvestor/InformasiRapatUmum'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  bahanMataAcara: ApiResponse<BahanMataAcaraType[]>
  pengumumanPemanggilan: ApiResponse<PengumumanDanPemanggilanType>
  ringkasanRisalah: ApiResponse<RingkasanRisalahType[]>
}> = async () => {
  const urls = [
    baseUrl + 'bahan_mata_acara?fields[]=*,data.*,data.translations.*',
    baseUrl + 'pengumuman_dan_pemanggilan?fields[]=*,translations.*&fields[]=*,content.*,content.translations.*',
    baseUrl + 'ringkasan_risalah?fields[]=*,data.*,data.translations.*',
  ]

  const [bahanMataAcara, pengumumanPemanggilan, ringkasanRisalah] = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
  )

  return { props: { bahanMataAcara, pengumumanPemanggilan, ringkasanRisalah } }
}

const PageInfromasiRapat = ({
  bahanMataAcara,
  pengumumanPemanggilan,
  ringkasanRisalah,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <InformasiRapatUmum
      bahanMataAcara={bahanMataAcara.data}
      pengumumanPemanggilan={pengumumanPemanggilan.data}
      ringkasanRisalah={ringkasanRisalah.data}
    />
  )
}

export default PageInfromasiRapat
