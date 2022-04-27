import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="bg-white">
      <Head>
        <title>Pixel share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center font-semibold text-3xl mb-44">Pixel Share</div>
    </div>
  )
}

export default Home
