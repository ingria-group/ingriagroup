import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { PiagamAuditInternalType } from '@/interface/AboutUsType'
import PiagamAuditInternal from '@/modules/aboutUs/PiagamAuditInternal/PiagamAuditInternal'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  piagamAuditInternal: ApiResponse<PiagamAuditInternalType>
}> = async () => {
  const res = await fetch(baseUrl + 'piagam_audit?fields[]=*,translations.*')
  const piagamAuditInternal = await res.json()
  return { props: { piagamAuditInternal } }
}

const PagePiagamAuditInternal = ({ piagamAuditInternal }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <PiagamAuditInternal piagamAuditInternal={piagamAuditInternal.data} />
}

export default PagePiagamAuditInternal
