import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect } from 'react'
// import Image from 'next/image'
import Content from '../components/Content'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { usePixelContext } from '../context/context'
import { fetchCategories, fetchPosts } from '../utils/useFetch'
import Error from '../components/Error'
import { PostsLoader } from '../utils/loader'

const Home: NextPage = () => {
  const { getCategories, getPosts, categories } = usePixelContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchCategories(getCategories)
    fetchPosts(setLoading, setError, getPosts)
  }, [])

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Pixel share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="h-[500px] bg-gradient-to-r from-cyan-500 to-blue-500 md:h-[550px]">
        <Header />
        <Hero />
      </header>

      <main className="py-4">
        <div className="relative flex container justify-center">
          {/* <div className='absolute top-0 left-0 bg-gradient-to-r from-[#ffffff] z-10 h-10 w-1/12' /> */}
          <div className="flex space-x-2 overflow-x-scroll whitespace-nowrap px-3 text-2xl scrollbar-hide first:pl-24 last:pr-20 md:space-x-6">
            {categories.map((category: { _id: string, name: string }) => (
              <div
                key={category._id}
                className="cursor-pointer whitespace-nowrap rounded-full border border-teal-600 px-6 py-2 text-center text-sm font-semibold capitalize transition duration-150 ease-in-out hover:bg-teal-500 hover:text-white"
              >
                {category.name}
              </div>
            ))}
          </div>
          <div className="absolute top-0 right-0 z-10 h-10 w-1/12 bg-gradient-to-l from-[#f3f4f6]" />
        </div>

        <div className="mx-auto mt-10 max-w-screen-2xl">
          {error ? (
            <Error message="Error occured trying to load posts!" />
          ) : (
            <>{loading ? <PostsLoader /> : <Content />}</>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
