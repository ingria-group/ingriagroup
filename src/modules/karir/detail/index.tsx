import { NextPage } from 'next'
import React from 'react'

import KarirIdPage from './KarirIdPage'
import Blank from '../../..//layouts/Blank'

const DetailKarirPage: NextPage = () => {
  return (
    <Blank title='Karir'>
      <div className='container mx-auto my-6 w-full'>
        <KarirIdPage />
      </div>
    </Blank>
  )
}

export default DetailKarirPage
