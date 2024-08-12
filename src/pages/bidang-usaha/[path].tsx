import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { BidangUsahaType } from '@/interface/BidangUsahaType'
import BidangUsahaId from '@/modules/bidangUsaha/detail/BidangUsahaId'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  bidangUsaha: ApiResponse<BidangUsahaType[]>
}> = async () => {
  const res = await fetch(baseUrl + 'bidang_usaha_data?fields[]=*,translations.*')
  const bidangUsaha = await res.json()
  return { props: { bidangUsaha } }
}

const PageBidangUsaha = ({ bidangUsaha }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <BidangUsahaId bidangUsaha={bidangUsaha.data} />
}

export default PageBidangUsaha
