import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { InformasiUntukInvestorType } from '@/interface/HubunganInvestorType'
import InformasiUntukInvestor from '@/modules/hubunganInvestor/InformasiUntukInvestor'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  informasiUntukInvestor: ApiResponse<InformasiUntukInvestorType[]>
}> = async () => {
  const res = await fetch(baseUrl + 'informasi_untuk_investor?fields[]=*,data.*,data.translations.*')
  const informasiUntukInvestor = await res.json()
  return { props: { informasiUntukInvestor } }
}

const PageInformasiUntukInvestor = ({
  informasiUntukInvestor,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <InformasiUntukInvestor informasiUntukInvestor={informasiUntukInvestor.data} />
}

export default PageInformasiUntukInvestor
