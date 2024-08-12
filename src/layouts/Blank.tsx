import { NextSeo } from 'next-seo'
import React, { FC } from 'react'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { appName } from '@/config/env'

interface BlankLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
}

const Blank: FC<BlankLayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={`%s | ${appName}`}
        description={description}
      />
      <Navbar />
      {/* <NavigationMenuDemo /> */}
      <main className='min-h-screen'>
        <section className=' bg-white'>{children}</section>
      </main>
      <Footer />
    </>
  )
}

export default Blank
