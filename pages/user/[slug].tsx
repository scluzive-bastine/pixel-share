import Image from 'next/image'
import { MdLocationOn } from 'react-icons/md'
import Header from '../../components/Header'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { client } from '../../sanity'
import { User, SinglePost } from '../../typings'
import Content from '../../components/Content'
import { getSession, useSession } from 'next-auth/react'
import { followUser, restructurePost } from '../../utils/functions'
import { useEffect, useState } from 'react'
import SettingsModal from '../../components/SettingsModal'
import { BsTwitter } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'

interface Props {
  user: User
}


const User = ({ user }: Props) => {
  const { data: session } = useSession()
  const token = session?.session?.token || ''
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [post, setPost] = useState(null)
  
  const { image, name, bio, followers, posts, _id, location } = user
  const followed = !!followers?.filter((follower: any) => follower._ref === token)

  let downloadsCount = 0
  const userPosts: SinglePost[] = []
  const myPosts: SinglePost[] = []

  // posts.map((post) => {
  //   if (post.postedBy._id === token) {
  //     myPosts.push(post)
  //   } else {
  //     myPosts.push(post)
  //   }
  // })

  // posts.filter((post: any) => {
  //   if (post.postedBy._id === token) {
  //     myPosts.push(post)
  //   } else {
  //     myPosts.push(post)
  //   }
  // })

  // console.log(posts);

   const query = `*[_type == "post" && postedBy._ref == "${_id}"] {
      _id,
      name,
      description,
      likes,
      downloads,
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
  }`

  const fetchPost = async () => {
    try {
      const data = await client.fetch(query) 
      setPost(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])  

  if (post) {
    restructurePost(post, userPosts)  
  }

  posts.map((post) => {
    if (post.downloads !== null) {
      downloadsCount += post.downloads.length
    }
  })

  const handleFollow = (user: string, followed: string) => {
    if (!followed) {
        followUser(user, followed)
    }
  }

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }    
  
  return (
    <div>
      <header className="bg-gradient-to-r from-cyan-500 to-blue-500">
        <Header />
      </header>
      <div className="relative mx-auto flex max-w-screen-lg justify-center px-2">
        <div className="mt-24">
          <div className="flex items-center justify-center">
            <div>
              <div className="flex items-center justify-center">
                <Image
                  src={image}
                  height={100}
                  width={100}
                  objectFit="cover"
                  className="rounded-full border border-teal-600"
                />
              </div>
                <div className="text-semibold mt-2 text-center">{name}</div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                {location ? (
                  <>
                    <MdLocationOn className="flex h-5" />
                    <div>{ location}</div>
                  </>
                ) : null}
              </div>
              <div className="flex items-center justify-center mt-4 space-x-2">
                {user.twitter ? (
                  <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                    <BsTwitter className='text-2xl text-teal-700 hover:text-teal-800' />
                  </a>
                ): null}
                {user.instagram ? (
                  <a href={user.instagram} target="_blank" rel="noopener noreferrer">
                  <AiFillInstagram className='text-2xl text-teal-700 hover:text-teal-800' />
                  </a>
                ): null}
              </div>
              {
                token !== _id && (
                  <div className="mt-3 flex items-center justify-center">
                    <button className={`bg-teal-500 text-white rounded capitalize text-xs px-3 py-1 ${!followed ? 'hover:bg-teal-600' : " "} transition duration-150 ease-in-out`} onClick={() => handleFollow(_id, token)}>{ !followed ? 'Follow' : 'Following'}</button>
                  </div>
                )
              }
              <p className="mt-4 max-w-screen-md text-center text-gray-500">
                {bio}
              </p>
              <div className="mt-3 flex justify-center space-x-4 text-sm text-gray-500">
                <div>
                  <span className="font-bold text-black">{ followers?.length ? followers.length : 0}</span> Followers
                </div>
                <div>
                  <span className="font-bold text-black">{ downloadsCount} </span> Downloads
                </div>
              </div>
              {token === _id && (
                <div className="flex justify-center mt-4">
                  <button className='rounded px-3 py-1 text-blue-600 border border-blue-500 hover:bg-blue-600 hover:text-white hover:underline font-semibold hover transition duration-150 ease-in-out' onClick={handleModalOpen}>Edit profile</button>
                </div>
                  
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-screen-2xl pb-10">
        <div className="text-center text-3xl font-bold">Posts</div>
        <Content posts={userPosts} />
      </div>
      <SettingsModal isOpen={isModalOpen} handleClose={handleModalClose} user={user} />
    </div>
  )
}

// We are type and graphic design studio. Our specialists are logo design, lettering, branding, typeface design and illustration. Also focus to elevate projects for great people.

export default User

export const getStaticPaths: GetStaticPaths = async () => {

  interface User {
    _id: string
    slug: string
  }

  const query = `*[_type == "user"] {
    _id,
    slug 
  }`

  const user = await client.fetch(query)

  const paths = user.map((user: User) => ({
    params: {
      slug: user?.slug,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}



export const getStaticProps: GetStaticProps = async ({ params }) => {

  const query = `*[_type == "user" && slug == $slug][0] {
    _id,
    name,
    bio,
    followers,
    location,
    image,
    instagram,
    twitter,
    'posts': *[_type == "post" && references(^._id)] {
      _id,
      name,
      description,
      likes,
      downloads,
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
        followers,
        instagram,
        twitter,
      },
    }
  }`

  const user = await client.fetch(query, { slug: params?.slug })
  
  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user,
    },
    revalidate: 60 // after 60s, it will update the old cached data
  }
}
