import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="bg-white">
      <Head>
        <title>Pixel share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='bg-gradient-to-r from-cyan-500 to-blue-500 h-[600px]'>
        <Header />
      </header>

    </div>
  )
}

export default Home
