import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Categories from '../components/Categories'
import Header from '../components/Header'
import SearchBar from '../components/Search'
import { usePixelContext } from '../context/context'
import { fetchCategories } from '../utils/useFetch'
import { searchQuery } from '../utils/queries'

import { client } from '../sanity'
import { SinglePost } from '../typings'
import Content from '../components/Content'
import { restructurePost } from '../utils/functions'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import {PostsLoader} from '../utils/loader'
import { getSession } from 'next-auth/react'

interface Props {
    posts: SinglePost[]
}

const Search = ({posts}: Props) => {
    const { query } = useRouter()
    const { getCategories } = usePixelContext()
    const restructuredPost: SinglePost[] = []

    restructurePost(posts, restructuredPost)
    
    useEffect(() => {
        fetchCategories(getCategories)
    }, [])
    
    
    

    
    return (
      <div>
        <header className="h-[300px] bg-gradient-to-r from-cyan-500 to-blue-500">
            <Header />
                <div className='mx-auto mt-10 max-w-screen-md px-3 lg:px-0'>
                  <h1 className='text-center text-3xl text-white font-bold pb-2 mt-5'>Explore</h1>
                  <SearchBar />
            </div>
          </header> 
            <main className="py-4">
                <Categories />
                <div className="mt-10">
                    {restructuredPost.length === 0 ? (
                        <div className="text-lg text-center">No Post Found!</div>
                    ): (
                        <Content posts={restructuredPost} />
                    )}
                </div>
          </main>
    </div>
        
  )
}

export default Search

export const getServerSideProps: GetServerSideProps = async (context) => {

    const query = context.query.q
    const searchQueryTearn = searchQuery(query);
    const res = await client.fetch(searchQueryTearn)
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
            posts: res
        }
    }
}
