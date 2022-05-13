import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import avatar from '../../images/avatar.jpg'
import { MdDownload, MdOutlineDownloadForOffline, MdMoreHoriz } from 'react-icons/md'
import { BsHeartFill } from 'react-icons/bs'
import { Popover } from '@headlessui/react'


import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'

import { client } from '../../sanity'
import { convertDateToHumanReadable, download } from '../../utils/functions' 
import { getSession, useSession } from 'next-auth/react'
import ShareButtons from '../../components/ShareButtons'

import {Post} from '../../typings'
import Comment from '../../components/Comment'
import { usePixelContext } from '../../context/context'

import { v4 as uuidv4 } from 'uuid'
import { fetchPosts } from '../../utils/useFetch'
import UserImageComponent from '../../components/UserImageComponent'


interface Props {
    post: Post
}

const Post = ({ post }: Props) => {
    const { posts, getPosts } = usePixelContext()

    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [like, setLike] = useState(false)
    const [follow, setFollow] = useState(false)
    const [likess, setLikess] = useState(0)
    const [followers, setFollowers] = useState(0)
    const token = session?.session?.token || ''

    const { likes, postedBy, downloads, name, description, comments, _id} = post
    
    const router = useRouter()
    
    const liked = !!likes?.filter((like: any) => like.postedBy._ref === token)?.length
    const followed = !!postedBy.followers?.filter((follower: any) => follower.user?._ref === token)?.length;

    const handleLike = async (id: string, userId: string) => {
        let likesl = 0        
        if (!liked) {
            const response = await fetch(`/api/like-post/`, {
                method: 'POST',
                body: JSON.stringify({ id, userId }),
            })
                .then((res) => {
                    setLike(true),
                    posts.filter((p: any) => {
                        if (p._id === _id) {
                            likesl = p.likes?.length
                        }
                    }),
                    setLikess(likes ? likes.length + 1 : 1)
            })
            .catch((error) => console.log(error))
        }
    }  

    
    
    const handleFollow = async (user: string, id: string) => {
        if (!followed && token !== postedBy._id) {
              const response = await fetch(`/api/follow-user/`, {
                method: 'POST',
                body: JSON.stringify({ user, id }),
            })
            .then((res) => {
                setFollow(true)
                setFollowers(postedBy.followers ? postedBy.followers.length + 1 : followers + 1)
            })
            .catch((error) => console.log(error))
        }
    }    

    

    useEffect(() => {
        setInterval(() => {
            setLike(liked)
            setFollow(followed)
        }, 200000)
        fetchPosts(setLoading, setError, getPosts)
        return () => {
            setLoading(false)
            setError(false)
        }
    }, [like, follow])
    

    const handleDownload = (e: any, id: string) => {
        e.stopPropagation()
        download(id)
    }    
    
    
  return (
      <div className=''>
        <header className="bg-gradient-to-r from-cyan-500 to-blue-500">
            <Header />
          </header>
          <main className="mx-auto max-w-screen-xl pb-20 overflow-hidden">
              <div className="mt-5 bg-white p-3 md:p-10 h-full md:rounded-3xl">
                  <div className="block md:flex space-x-10">
                      <div className='w-full md:w-2/3'>
                          <div className="flex items-center space-x-3 mb-4 cursor-pointer md:hidden" onClick={() => router.push(`/user/${postedBy.slug}`)}>
                              <UserImageComponent image={postedBy.image} />
                              <div className="">{ postedBy.name}</div>
                          </div>
                          <h1 className='text-3xl font-semibold text-black mb-2 hidden md:flex'>{ name}</h1>
                          <div className='md:flex space-x-10 md:space-x-10 mt-4 mb-10 w-full hidden '>
                              <div>
                                  <h1 className='text-sm md:text-lg font-semibold text-black'>Downloads</h1>
                                  <span className='text-sm text-gray-600'>{ downloads?.length > 0 ? downloads.length: "0"}</span>
                              </div>
                              <div>
                                  <h1 className='text-sm md:text-lg font-semibold text-black'>Featured in</h1>
                                  <span className='text-sm text-gray-600 hover:underline hover:text-black cursor-pointer'>{ post.category.name}</span>
                              </div>
                              <div>
                                  <h1 className='text-sm md:text-lg font-semibold text-black'>Posted</h1>
                                  <div className='text-sm text-gray-600'>{ convertDateToHumanReadable(post._createdAt)}</div>
                              </div>
                              <div>
                                  <h1 className='text-sm md:text-lg font-semibold text-black'>Likes</h1>
                                  <div className='text-sm text-gray-600'>{ likes || likess ? likess || likes.length : "0"}</div>
                              </div>
                          </div>
                          <div className="relative my-5">
                              <img src={ post.image.asset.url} alt="image-name" loading='lazy' className='rounded-3xl m' />
                          </div>
                            <div className="flex md:hidden pl-0 md:space-x-10 justify-between mt-2 md:my-5 px-3 py-2">
                                <div className='flex space-x-4 items-center'>
                                    <BsHeartFill className={`text-xl ${!liked ? 'text-gray-200 hover:text-red-200 ' : 'text-red-600'} cursor-pointer transition duration-150 ease-in-out`} onClick={() => handleLike(post._id, token)} />
                                        <a href={`${post?.image.asset.url}?dl=`}
                                        download
                                        onClick={(e) => handleDownload(e, post._id)}>
                                    <MdOutlineDownloadForOffline className='text-2xl text-teal-500 hover:text-teal-500 cursor-pointer'/>
                                    </a>
                                </div>
                                <Popover className="relative">
                                    <Popover.Button className="outline-none active:outline-none focus:outline-none">
                                      <MdMoreHoriz className='text-2xl' />
                                    </Popover.Button>

                                    <Popover.Panel className="absolute z-10 -left-36 border border-gray-200 w-[180px] bg-white px-3 py-2 rounded-md">
                                        <ShareButtons title={name} id={ post._id} />
                                    </Popover.Panel>
                                </Popover>
                          </div>
                          {/* show only on mobile */}
                          <div className='text-sm text-gray-600 flex md:hidden mb-4'>{likes || likess ? likess || likes.length : "0"} Likes</div> 
                          <h1 className='text-3xl font-semibold text-black mb-2 flex md:hidden'>{ name}</h1>
                          <p className=' text-gray-500'>
                              { description}
                          </p>
                          <div className="flex md:hidden">
                              <Comment id={post._id} user={token} comments={comments} />
                          </div>
                          {/* ../ show only on mobile */}
                      </div>
                      <div className='hidden md:block w-1/3'>
                        <a href={`${post?.image.asset.url}?dl=`}
                            download
                            onClick={(e) => handleDownload(e, post._id)}>
                                    <div className='bg-blue-500 text-white rounded-xl mb-5 p-4 flex space-x-3 cursor-pointer hover:shadow-xl transition duration-150 ease-in-out'>
                                    <div className='border-r-2 pr-2 border-blue-900 flex items-center'>
                                        <MdDownload className='text-3xl text-blue-900'/>
                                    </div>
                                    <div className='text-xl'>Download</div>
                                </div>
                        </a>
                        <div className='border border-gray-300 rounded-xl p-4 mb-5 flex justify-between items-center'>
                            <div onClick={() => handleLike(post._id, token)}>
                                <BsHeartFill className={`text-2xl ${ !liked && !like  ? 'text-gray-200 hover:text-red-200 ' : 'text-red-600'} mb-2 cursor-pointer transition duration-150 ease-in-out`} />
                                <div>
                                    { !liked ? 'Like' : 'Liked'}
                                </div>
                            </div>
                        <div>
                            <h1 className='mb-2 text-lg'>Share</h1>
                                <ShareButtons title={ name} id={ post._id}  />
                        </div>
                        </div>
                        <div className='border border-gray-300 rounded-3xl px-3 py-4 w-full'>
                            <div className="relative h-[80px] w-[80px] rounded-full mx-auto cursor-pointer hover:shadow-lg transition duration-150 ease-in-out" onClick={() => router.push(`/user/${postedBy.slug}`)}>
                                <Image src={post.postedBy.image} layout="fill" objectFit='cover' className='rounded-full' />
                            </div>
                              {token !== postedBy._id && (
                                <div className="flex justify-center my-4">
                                    <button className={`bg-teal-500 text-white rounded capitalize text-xs px-3 py-1 ${!follow && !followed ? 'hover:bg-teal-600' : " "} transition duration-150 ease-in-out`} onClick={() => handleFollow(post.postedBy._id, token)}>{ !followed && !follow ? 'Follow' : 'Following'}</button>
                                </div>
                              )}
                            <div className='text-center'>
                                <h1 className='text-xl text-black font-semibold'>{post.postedBy.name}</h1>
                                <span className='text-gray-500'>Followers: { followers || postedBy.followers?.length ?  followers || postedBy.followers.length : 0}</span>
                                <p className='text-sm text-gray-500 font-light mt-4'>{ post.postedBy.bio}</p>
                            </div>
                        </div>
                          <Comment id={post._id} user={token} comments={comments} />
                      </div>
                  </div>
              </div>
          </main>
    </div>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths  = async () => {
    interface Post {
        _id: string
    }

    const query = `*[_type == "post"] {
      _id
    }`

    const post = await client.fetch(query)

    const paths = post.map((post: Post) => ({
        params: {
            id: post._id 
        }
    }))
    return {
        paths,
        fallback: 'blocking',
    }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {

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
            slug,
            name,
            email,
            image,
            bio,
            socials,
            followers
        },
        likes,
        downloads,
        "comments": *[_type == 'comment' && references(^._id)] {
          _id,
          _createdAt,
          comment,
          user -> {
            _id,
            name,
            image
          }
        }
    }`

    const post = await client.fetch(query, { id: params?.id })

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