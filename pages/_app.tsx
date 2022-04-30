import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import {PixelProvider} from '../context/context'


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
