import { DocumentProps, Head, Html, Main, NextScript } from 'next/document'
import * as React from 'react'

const MyDocument: React.FC<DocumentProps> = () => {
  return (
    <Html>
      <Head>
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body className='font-body text-grey-800'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
