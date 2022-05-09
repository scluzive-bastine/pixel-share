import { useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { categoryPostsQuery } from '../../utils/queries'
import { client } from '../../sanity'
import Content from '../../components/Content'

import { restructurePost } from '../../utils/functions'
import { SinglePost } from '../../typings'
import Header from "../../components/Header"
import Categories from '../../components/Categories'
import { fetchCategories } from '../../utils/useFetch'
import {usePixelContext} from '../../context/context'

interface Props {
    posts: SinglePost[]
}
const Category = ({ posts }: Props) => {
    const CategoryPosts: SinglePost[] = []
    const {getCategories} = usePixelContext()

    restructurePost(posts, CategoryPosts)

    useEffect(() => {
        fetchCategories(getCategories)
    },[])
    
    
  return (
      <div>
        <header className="h-[300px] bg-gradient-to-r from-cyan-500 to-blue-500">
              <Header />
              <div className='mt-10'>
                  <h1 className='text-center text-3xl text-white font-bold pb-2'>Explore</h1>
              </div>
          </header>
          <main className="py-4">
            <Categories />
              {CategoryPosts.length > 0 ? (
                  <Content posts={CategoryPosts} />
              ) : (
                      <div className="mx-auto mt-10 max-w-screen-2xl">
                          <h1 className="text-center text-lg text-gray-700">No posts found in the category</h1>
                  </div>
              )}
              
          </main>
    </div>
  )
}

export default Category

export const getStaticPaths: GetStaticPaths = async () => {
    interface Category {
        _id: string
    }
    
    const query = `*[_type == 'category'] {
        _id,
    }`

    const categories = await client.fetch(query)

    const paths = categories.map((category: Category) => ({
        params: {
            id: category._id
        }
    }))

    return {
        paths, 
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const query = categoryPostsQuery(params?.id)
    const posts = await client.fetch(query, {id: params?.id})

    return {
        props: {
            posts
        }
    }
}