import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import Masonry from 'react-masonry-css'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Post from '../components/Post'

const categories = [
  {
    name: "Beach"
  },
  {
    name: "City"
  },
  {
    name: "Technology"
  },
  {
    name: "Nature"
  },
  {
    name: "Food"
  },
  {
    name: "Travel"
  }, 
  {
    name: "Fashion"
  },
  {
    name: "Architecture"
  }, {
    name: "Office"
  },
  {
    name: "Work"
  }
]

const posts = [
  {
    name: 'Sabastine',
    description: "My remote office",
    likes: '12',
    image: "https://i.pinimg.com/564x/e4/ab/34/e4ab34886c891179536a035ea9375d6c.jpg"
  },
  {
    name: 'Smith',
    description: "Web design",
    likes: '1290',
    image: "https://i.pinimg.com/564x/af/50/c0/af50c08f34ec158359094452a8143b5c.jpg"
  },
  {
    name: 'Jane',
    description: "What a cool gaming setup idea 💖✨",
    likes: '90',
    image: "https://i.pinimg.com/564x/42/d6/31/42d631865ff56676bb49e8e48b82aaab.jpg"
  },
  {
    name: 'Smith',
    description: "Gaming office",
    likes: '21',
    image: "https://i.pinimg.com/564x/eb/50/83/eb508362b81cb1f3b82a2f1e6019f1d9.jpg"
  },
    {
    name: 'John',
    description: "Born for art",
    likes: '21',
    image: "https://i.pinimg.com/564x/bf/33/14/bf3314326329d40502bd0c87a7079def.jpg"
  },
  {
    name: 'Moti',
    description: "Behance Work",
    likes: '201',
    image: "https://i.pinimg.com/564x/fc/ff/d8/fcffd8b5c91938779d7d8c971c5d91fa.jpg"
  },
]


const breakpointsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
}


const Home: NextPage = () => {
  return (
    <div className="bg-white">
      <Head>
        <title>Pixel share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='bg-gradient-to-r from-cyan-500 to-blue-500 h-[500px] md:h-[550px]'>
        <Header />
        <Hero />
      </header>

      <main className="py-4">
        <div className="relative max-w-screen-lg mx-auto flex justify-center">
          <div className='absolute top-0 left-0 bg-gradient-to-r from-[#ffffff] z-10 h-10 w-1/12' />
          <div className="flex px-3 text-2xl whitespace-nowrap space-x-2 md:space-x-6 overflow-x-scroll scrollbar-hide first:pl-24 last:pr-20">
            {categories.map((category, i) => (
              <div key={i} className="text-center px-6 py-2 rounded-full border whitespace-nowrap border-teal-600 text-sm font-semibold capitalize hover:bg-teal-500 hover:text-white transition duration-150 ease-in-out cursor-pointer">{ category.name}</div>
            ))}
          </div>
          <div className='absolute top-0 right-0 bg-gradient-to-l from-[#ffffff] z-10 h-10 w-1/12' />
        </div>

        <div className="mt-10 max-w-screen-2xl mx-auto">
          <Masonry className='flex' breakpointCols={breakpointsObj}>
            {posts.map((post, i) => (
              <Post
                key={i}
                name={post.name}
                description={post.description}
                likes={post.likes}
                image={post.image}
              />
            ))}
          </Masonry>
        </div>
      </main>

    </div>
  )
}

export default Home
