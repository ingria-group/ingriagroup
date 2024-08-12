import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { PendirianPerseroanType, TentangPerjalananKamiType, VisiDanMisiType } from '@/interface/AboutUsType'
import IkhtisarPerusahaan from '@/modules/aboutUs/IkhtisarPerusahaan'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  tentangPerjalananKami: ApiResponse<TentangPerjalananKamiType>
  visiDanMisi: ApiResponse<VisiDanMisiType>
  pendirianPerseroan: ApiResponse<PendirianPerseroanType[]>
}> = async () => {
  const urls = [
    baseUrl + 'perjalanan_kami?fields[]=*,translations.*',
    baseUrl + 'visi_dan_misi?fields[]=*,translations.*',
    baseUrl + 'pendirian_perseroan?fields[]=*,translations.*',
  ]

  const [tentangPerjalananKami, visiDanMisi, pendirianPerseroan] = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
  )
  return { props: { tentangPerjalananKami, visiDanMisi, pendirianPerseroan } }
}

const PerusahaanIkhtisar = ({
  tentangPerjalananKami,
  visiDanMisi,
  pendirianPerseroan,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <IkhtisarPerusahaan
      tentangPerjalananKami={tentangPerjalananKami.data}
      visiDanMisi={visiDanMisi.data}
      pendirianPerseroan={pendirianPerseroan.data}
    />
  )
}

export default PerusahaanIkhtisar
