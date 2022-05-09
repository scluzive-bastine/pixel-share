import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { PixelProvider } from '../context/context'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return (
      <SessionProvider session={session}>
        <PixelProvider>
          <Component {...pageProps} />
        </PixelProvider>
      </SessionProvider>
  )
}

export default MyApp
