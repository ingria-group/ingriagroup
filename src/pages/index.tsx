import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { BidangUsahaType } from '@/interface/BidangUsahaType'
import Page from '@/modules/home'
import { DataFindType } from '@/modules/home/FindThePerfectHome'
import { NewMahakamGrandeType } from '@/modules/home/NewMahakamGrande'
import { NewsArticlesType } from '@/modules/home/NewsArticles'
import { OurBusinessType } from '@/modules/home/OurBusiness'
import { DataVideoType } from '@/modules/home/WeHaveWhat'
import { YouTrustedRealType } from '@/modules/home/YouTrustedReal'
import { baseUrl } from '@/utils/baseUrl'

interface ApiResponse<T> {
  data: T
}

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps<{
  findPerfectData: ApiResponse<DataFindType>
  dataVideo: ApiResponse<DataVideoType>
  dataNewArticles: ApiResponse<NewsArticlesType[]>
  dataOurBusiness: ApiResponse<OurBusinessType>
  dataYouTrustedReal: ApiResponse<YouTrustedRealType>
  dataNewMahakam: ApiResponse<NewMahakamGrandeType[]>
  dataBidangUsaha: ApiResponse<BidangUsahaType[]>
}> = async () => {
  const urls = [
    baseUrl + 'mainhero?fields[]=*,translations.*',
    baseUrl + 'data_video?&fields[]=*,translations.*',
    baseUrl + 'new_articles?fields[]=*,translations.*&fields[]=*,translations.data_berita.*',
    baseUrl + 'our_business?fields[]=*,translations.*&fields[]=*,logo.*',
    baseUrl + 'real_estate?fields[]=*,translations.*',
    baseUrl + 'new_mahakam?fields[]=*,translations.*',
    baseUrl + 'bidang_usaha_data?fields[]=*,translations.*',
  ]

  const [
    findPerfectData,
    dataVideo,
    dataNewArticles,
    dataOurBusiness,
    dataYouTrustedReal,
    dataNewMahakam,
    dataBidangUsaha,
  ] = await Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))

  return {
    props: {
      findPerfectData,
      dataVideo,
      dataNewArticles,
      dataOurBusiness,
      dataYouTrustedReal,
      dataNewMahakam,
      dataBidangUsaha,
    },
  }
}

const Home = ({
  findPerfectData,
  dataVideo,
  dataNewArticles,
  dataOurBusiness,
  dataYouTrustedReal,
  dataNewMahakam,
  dataBidangUsaha,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Page
      findPerfectData={findPerfectData.data}
      dataVideo={dataVideo.data}
      dataNewArticles={dataNewArticles.data}
      dataOurBusiness={dataOurBusiness.data}
      dataYouTrustedReal={dataYouTrustedReal.data}
      dataNewMahakam={dataNewMahakam.data}
      dataBidangUsaha={dataBidangUsaha.data}
    />
  )
}

export default Home
