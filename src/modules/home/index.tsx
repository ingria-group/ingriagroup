import { NextPage } from 'next'
import React from 'react'

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
  dataNewArticles: NewsArticlesType
  dataOurBusiness: OurBusinessType
  dataYouTrustedReal: YouTrustedRealType
  dataNewMahakam: NewMahakamGrandeType[]
}

const Page: NextPage<HomeProps> = ({
  findPerfectData,
  dataVideo,
  dataNewArticles,
  dataOurBusiness,
  dataYouTrustedReal,
  dataNewMahakam,
}) => {
  return (
    <Blank
      title='Home'
      description='Ingria Group adalah developer rumah subsidi & komersil terpercaya. Berlokasi di banyak kawasan strategis, kami siap menjawab kebutuhan hunian murah berkualitas Anda.'
    >
      <FindThePerfectHome findPerfectData={findPerfectData} />
      <WeHaveWhat dataVideo={dataVideo} />
      <YouTrustedReal dataYouTrustedReal={dataYouTrustedReal} />
      <NewMahakamGrande dataNewMahakam={dataNewMahakam} />
      <OurBusiness dataOurBusiness={dataOurBusiness} />
      <NewsArticles dataNewArticles={dataNewArticles} />
    </Blank>
  )
}

export default Page
