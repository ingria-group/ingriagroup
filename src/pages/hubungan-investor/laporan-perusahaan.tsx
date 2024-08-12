import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { IkhtisarKeuanganType, LaporanKeuanganDataType, LaporanType } from '@/interface/HubunganInvestorType'
import LaporanPerusahaan from '@/modules/hubunganInvestor/LaporanPerusahaan'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  ikhtisarKeuangan: ApiResponse<IkhtisarKeuanganType>
  laporanTahunan: ApiResponse<LaporanType[]>
  laporanKeuangan: ApiResponse<LaporanKeuanganDataType[]>
  prospektusData: ApiResponse<LaporanType[]>
}> = async () => {
  const urls = [
    baseUrl +
      'ikhtisar_keuangan_data?fields[]=*,translations.*&fields[]=*,data.*,data.dataTable.*,data.translations.*,data.dataTable.translations.*',
    baseUrl + 'laporan_tahunan?fields[]=*,translations.*',
    baseUrl + 'laporan_keuangan?fields[]=*,data.*,data.translations.*',
    baseUrl + 'prospektus_data?fields[]=*,translations.*',
  ]

  const [ikhtisarKeuangan, laporanTahunan, laporanKeuangan, prospektusData] = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
  )

  return { props: { ikhtisarKeuangan, laporanTahunan, laporanKeuangan, prospektusData } }
}

const PageLaporanPerusahaan = ({
  ikhtisarKeuangan,
  laporanKeuangan,
  laporanTahunan,
  prospektusData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <LaporanPerusahaan
      ikhtisarKeuangan={ikhtisarKeuangan.data}
      laporanKeuangan={laporanKeuangan.data}
      laporanTahunan={laporanTahunan.data}
      prospektusData={prospektusData.data}
    />
  )
}

export default PageLaporanPerusahaan
