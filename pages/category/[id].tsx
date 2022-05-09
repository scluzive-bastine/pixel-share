import { GetStaticPaths, GetStaticProps } from 'next'
import { categoryPostsQuery } from '../../utils/queries'
import { client } from '../../sanity'
import Content from '../../components/Content'

import { restructurePost } from '../../utils/functions'
import { SinglePost } from '../../typings'
import Header from "../../components/Header"

const Category = ({ posts }) => {
    const CategoryPosts: SinglePost[] = []
    restructurePost(posts, CategoryPosts)
    
    
  return (
      <div>
        <header className="bg-gradient-to-r from-cyan-500 to-blue-500">
            <Header />
          </header>
          <main className="py-4">
            <Content posts={CategoryPosts} />
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

    const query = categoryPostsQuery(params.id)
    const posts = await client.fetch(query, {id: params?.id})

    return {
        props: {
            posts
        }
    }
}