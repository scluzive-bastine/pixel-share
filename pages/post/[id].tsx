import Image from 'next/image'
import {useState} from 'react'
import Header from '../../components/Header'
import avatar from '../../images/avatar.jpg'
import { MdDownload } from 'react-icons/md'
import { BsHeartFill } from 'react-icons/bs'

import { GetStaticPaths, GetStaticProps } from 'next'

import { client } from '../../sanity'
import { convertDateToHumanReadable, likePost, followUser } from '../../utils/functions' 
import { useSession } from 'next-auth/react'


const Post = ({ post }) => {
    const { data: session } = useSession()

    const { likes, postedBy } = post
    
    const liked = !!likes?.filter((like: any) => like.postedBy._ref === session?.session.token)
    const followed = !!postedBy.followers?.filter((follower: any) => follower._ref === session?.session.token)
    const handleLike = (id: string, userId: string) => {
        if (!liked) {
            likePost(id, userId)
        }
    }  
    
    const handleFollow = (user: string, followed: string) => {
        if (!followed) {
            followUser(user, followed)
        }
    }
    
  return (
      <div className=''>
        <header className="bg-gradient-to-r from-cyan-500 to-blue-500">
            <Header />
          </header>
          <main className="mx-auto max-w-screen-xl relative pb-20">
              <div className="mt-5 bg-white p-3 md:p-10 h-full md:rounded-3xl">
                  <div className="block md:flex space-x-10">
                      <div className='w-full md:w-2/3 relative'>
                          <h1 className='text-3xl font-semibold text-black mb-2'>{ post.name}</h1>
                          <div className='flex space-x-10 md:space-x-10 mt-4 mb-10 w-full'>
                              <div>
                                  <h1 className='text-sm md:text-lg font-semibold text-black'>Downloads</h1>
                                  <span className='text-sm text-gray-600'>20,100</span>
                              </div>
                              <div>
                                  <h1 className='text-sm md:text-lg font-semibold text-black'>Featured in</h1>
                                  <span className='text-sm text-gray-600 hover:underline hover:text-black cursor-pointer'>Nature</span>
                              </div>
                              <div>
                                  <h1 className='text-sm md:text-lg font-semibold text-black'>Posted</h1>
                                  <div className='text-sm text-gray-600'>{ convertDateToHumanReadable(post._createdAt)}</div>
                              </div>
                              <div>
                                  <h1 className='text-sm md:text-lg font-semibold text-black'>Likes</h1>
                                  <div className='text-sm text-gray-600'>{ likes ? likes.length : "0"}</div>
                              </div>
                          </div>
                          <div className="relative my-5">
                              <img src={ post.image.asset.url} alt="image-name" loading='lazy' className='rounded-3xl m' />
                          </div>
                            <div className="flex md:hidden space-x-10  justify-between my-5 bg-gray-100 px-3 py-2 rounded-lg ">
                              <div className='flex space-x-4 items-center'>
                                  <BsHeartFill className={`text-xl ${!liked ? 'text-gray-200 hover:text-red-200 ' : 'text-red-600'} cursor-pointer transition duration-150 ease-in-out`}  onClick={() => handleLike(post._id, session?.session.token)} />
                                    <a href={`${post?.image.asset.url}?dl=`}
                                      download
                                      onClick={(e) => e.stopPropagation()}>
                                  <MdDownload className='text-3xl text-gray-200 hover:text-teal-600 cursor-pointer'/>
                                </a>
                             </div>
                              <div className="flex space-x-4 items-center">
                                  <div>F</div>
                                  <div>T</div>
                                  <div>P</div>
                              </div>
                          </div>
                          <p className=' text-gray-500'>
                              { post.description}
                          </p>
                      </div>
                      <div className='hidden md:block w-1/3'>
                          <a href={`${post?.image.asset.url}?dl=`}
                            download
                            onClick={(e) => e.stopPropagation()}>
                               <div className='bg-blue-500 text-white rounded-xl mb-5 p-4 flex space-x-3 cursor-pointer hover:shadow-xl transition duration-150 ease-in-out'>
                              <div className='border-r-2 pr-2 border-blue-900 flex items-center'>
                                  <MdDownload className='text-3xl text-blue-900'/>
                              </div>
                            <div className='text-xl'>Download</div>
                          </div>
                            </a>
                          <div className='border border-gray-300 rounded-xl p-4 mb-5'>
                              <h1 className='mb-3 text-xl font-semibold'>Share</h1>
                              <div className="grid grid-cols-3 gap-2">
                                  <div>F</div>
                                  <div>T</div>
                                  <div>P</div>
                              </div>
                          </div>
                          <div className='flex flex-col justify-center p-5 border border-gray-300 rounded-xl mb-5' onClick={() => handleLike(post._id, session?.session.token)}>
                              <div className="w-full flex justify-center">
                                  <BsHeartFill className={`text-5xl ${!liked ? 'text-gray-200 hover:text-red-200 ': 'text-red-600'} cursor-pointer transition duration-150 ease-in-out`} />
                              </div>
                              <div className="text-center mt-2 text-xl">
                                  { !liked ? 'Like' : 'Liked'}
                              </div>
                          </div>

                            <div className='border border-gray-300 rounded-3xl px-3 py-4 w-full'>
                                <div className="relative h-[80px] w-[80px] rounded-full mx-auto">
                                    <Image src={post.postedBy.image} layout="fill" objectFit='cover' className='rounded-full' />
                                </div>
                                <div className="flex justify-center my-4">
                                  <button className="bg-teal-500 text-white rounded capitalize text-xs px-3 py-1 hover:bg-teal-600 transition duration-150 ease-in-out" onClick={() => handleFollow(post.postedBy._id, session?.session.token)}>{ !followed ? 'Follow' : 'Following'}</button>
                                </div>
                                <div className='text-center'>
                                  <h1 className='text-xl text-black font-semibold'>{ post.postedBy.name}</h1>
                                  <p className='text-sm text-gray-500 font-light'>{ post.postedBy.bio}</p>
                                </div>
                            </div>
                        </div>
                  </div>
              </div>
          </main>
    </div>
  )
}

export default Post

export const getStaticPaths = async () => {
    const query = `*[_type == "post"] {
      _id
    }`

    const post = await client.fetch(query)

    const paths = post.map((post) => ({
        params: {
            id: post._id
        }
    }))
    return {
        paths,
        fallback: 'blocking',
    }

}

export const getStaticProps = async ({ params }) => {

    const query = `*[_type == "post" && _id == $id][0] {
        _id,
        name,
        description,
        _createdAt,
        category -> {
            name,
            _id
        },
        image{
            asset -> {
                url
            }
        },
        postedBy -> {
            _id,
            name,
            email,
            image,
            bio,
            socials,
            followers
        },
        likes,
    }`

    const post = await client.fetch(query, { id: params.id })

    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post
        },
        revalidate: 60 // after 60s, it will update the old cached data
    }
}