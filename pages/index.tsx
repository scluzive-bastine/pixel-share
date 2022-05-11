import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect } from 'react'
// import Image from 'next/image'
import Content from '../components/Content'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { usePixelContext } from '../context/context'
import { fetchCategories, fetchPosts, fetchUser } from '../utils/useFetch'
import Error from '../components/Error'
import { PostsLoader } from '../utils/loader'
import { SinglePost } from '../typings'
import {restructurePost} from '../utils/functions'
import { useRouter } from 'next/router'
import Categories from '../components/Categories'
import { getSession, useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { getCategories, getPosts, posts, getUser } = usePixelContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { data: session } = useSession()
  const token = session?.session?.token || ''


  const router = useRouter()

  useEffect(() => {
    fetchCategories(getCategories)
    fetchUser(token, getUser)
    fetchPosts(setLoading, setError, getPosts)
  }, [])

  const userPosts: SinglePost[] = []
  restructurePost(posts, userPosts)

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Pixel share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="h-[300px] bg-gradient-to-r from-cyan-500 to-blue-500 md:h-[550px]">
        <Header />
        <Hero />
      </header>

      <main className="py-4">
        <Categories />
        <div className="mx-auto mt-10 max-w-screen-2xl">
          {error ? (
            <Error message="Error occured trying to load posts!" />
          ) : (
              <>{loading ? <PostsLoader /> : <Content posts={ userPosts} />}</>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session
    }
  }
    
}
