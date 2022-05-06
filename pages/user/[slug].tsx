import Image from 'next/image'
import { MdLocationOn } from 'react-icons/md'
import Header from '../../components/Header'
import avatar from '../../images/avatar.jpg'
import { GetStaticProps, GetStaticPaths } from 'next'
import { client } from '../../sanity'
import { User, SinglePost } from '../../typings'
import Content from '../../components/Content'
import { useSession } from 'next-auth/react'
import { followUser, restructurePost } from '../../utils/functions'
import { useState } from 'react'

interface Props {
  user: User
}


const User = ({ user }: Props) => {
  const { data: session } = useSession()
  const token = session?.session?.token || ''
  
  const { image, name, bio, followers, posts, _id, location } = user
  const followed = !!followers?.filter((follower: any) => follower._ref === token)

  let downloadsCount = 0
  const userPosts: SinglePost[] = []

  restructurePost(posts, userPosts)
  console.log(posts);
  

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
              <div className="text-semibold mt-2 text-center">{ name}</div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                {location ? (
                  <>
                    <MdLocationOn className="flex h-5" />
                    <div>{ location}</div>
                  </>
                ) : null}
              </div>
              <div className="mt-2 flex items-center justify-center">
                <button className={`bg-teal-500 text-white rounded capitalize text-xs px-3 py-1 ${!followed ? 'hover:bg-teal-600' : " "} transition duration-150 ease-in-out`} onClick={() => handleFollow(_id, token)}>{ !followed ? 'Follow' : 'Following'}</button>
              </div>
              <p className="mt-4 max-w-screen-md text-center text-gray-500">
                { bio}
              </p>
              <div className="mt-3 flex justify-center space-x-4 text-sm text-gray-500">
                <div>
                  <span className="font-bold text-black">{ followers?.length ? followers.length : 0}</span> Followers
                </div>
                <div>
                  <span className="font-bold text-black">{ downloadsCount} </span> Downloads
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-screen-2xl pb-10">
        <div className="text-center text-3xl font-bold">Posts</div>
        <Content posts={userPosts} />
      </div>
    </div>
  )
}

export default User

export const getStaticPaths: GetStaticPaths = async () => {

  interface User {
    _id: string
    slug: {
      current: string
    }
  }

  const query = `*[_type == "user"] {
    _id,
    slug {
      current
    }
  }`

  const user = await client.fetch(query)

  const paths = user.map((user: User) => ({
    params: {
      slug: user?.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}



export const getStaticProps: GetStaticProps = async ({params}) => {

  const query = `*[_type == "user" && slug.current == $slug][0] {
    _id,
    name,
    bio,
    followers,
    location,
    image,
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
        socials,
        followers
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
