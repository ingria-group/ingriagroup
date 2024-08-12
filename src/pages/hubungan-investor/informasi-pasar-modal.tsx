import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { InformasiPasarModalType } from '@/interface/HubunganInvestorType'
import InformasiPasarModal from '@/modules/hubunganInvestor/InformasiPasarModal'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  informasiPasarModal: ApiResponse<InformasiPasarModalType[]>
}> = async () => {
  const res = await fetch(baseUrl + 'informasi_pasar_modal_data?fields[]=*,translations.*')
  const informasiPasarModal = await res.json()
  return { props: { informasiPasarModal } }
}

const PageTataKelola = ({ informasiPasarModal }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <InformasiPasarModal informasiPasarModal={informasiPasarModal.data} />
}

export default PageTataKelola
