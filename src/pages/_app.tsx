import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffect, useState } from 'react'

import '@/styles/theme.css'

import Loading from '@/components/Loading'
import { wrapper } from '@/store'

const MyApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  const router = useRouter()

  const [progress, setProgress] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  })

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setProgress((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }))
    }

    const handleRouteChangeEnd = () => {
      setProgress((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }))
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeEnd)
    router.events.on('routeChangeError', handleRouteChangeEnd)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeEnd)
      router.events.off('routeChangeError', handleRouteChangeEnd)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1, width=device-width'
        />
        <meta
          property='og:title'
          content='Ingria Group - Developer Rumah Subsidi dan Komersil Terpercaya'
        />
      </Head>
      <Loading
        key={progress.loadingKey}
        isRouteChanging={progress.isRouteChanging}
      />
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(MyApp)
