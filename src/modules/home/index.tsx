import { NextPage } from 'next'
import React from 'react'

import { BidangUsahaType } from '@/interface/BidangUsahaType'
import Blank from '@/layouts/Blank'

import FindThePerfectHome, { DataFindType } from './FindThePerfectHome'
import NewMahakamGrande, { NewMahakamGrandeType } from './NewMahakamGrande'
import NewsArticles, { NewsArticlesType } from './NewsArticles'
import OurBusiness, { OurBusinessType } from './OurBusiness'
import WeHaveWhat, { DataVideoType } from './WeHaveWhat'
import YouTrustedReal, { YouTrustedRealType } from './YouTrustedReal'

export interface HomeProps {
  findPerfectData: DataFindType
  dataVideo: DataVideoType
  dataNewArticles: NewsArticlesType[]
  dataOurBusiness: OurBusinessType
  dataYouTrustedReal: YouTrustedRealType
  dataNewMahakam: NewMahakamGrandeType[]
  dataBidangUsaha: BidangUsahaType[]
}

const Page: NextPage<HomeProps> = ({
  findPerfectData,
  dataVideo,
  dataNewArticles,
  dataOurBusiness,
  dataYouTrustedReal,
  dataNewMahakam,
  dataBidangUsaha,
}) => {
  return (
    <Blank
      title='Home'
      description='Ingria Group adalah developer rumah subsidi & komersil terpercaya. Berlokasi di banyak kawasan strategis, kami siap menjawab kebutuhan hunian terjangkau berkualitas Anda.'
    >
      <FindThePerfectHome findPerfectData={findPerfectData} />
      <WeHaveWhat dataVideo={dataVideo} />
      <YouTrustedReal dataYouTrustedReal={dataYouTrustedReal} />
      <NewMahakamGrande
        dataNewMahakam={dataNewMahakam}
        dataBidangUsaha={dataBidangUsaha}
      />
      <OurBusiness dataOurBusiness={dataOurBusiness} />
      <NewsArticles dataNewArticles={dataNewArticles} />
    </Blank>
  )
}

export default Page
