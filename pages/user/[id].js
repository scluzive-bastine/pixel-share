import Image from 'next/image'
import { MdLocationOn } from 'react-icons/md'
import Header from '../../components/Header'
import avatar from '../../images/avatar.jpg'

const User = () => {
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
                  src={avatar}
                  height={100}
                  width={100}
                  objectFit="cover"
                  className="rounded-full border border-teal-600"
                />
              </div>
              <div className="text-semibold mt-2 text-center">Sabastine</div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <MdLocationOn className="flex h-5" />
                <div>California, USA</div>
              </div>
              <div className="mt-2 flex items-center justify-center">
                <button className="rounded bg-teal-500 px-6 py-1 text-sm text-white ">
                  Follow
                </button>
              </div>
              <p className="mt-4 max-w-screen-md text-center text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                placeat provident labore iste possimus harum dolorem quia autem,
                illo dolor repellat ratione. Quam ut fugit at voluptate. Veniam,
                cum ratione?
              </p>
              <div className="mt-3 flex justify-center space-x-4 text-sm text-gray-500">
                <div>
                  <span className="font-bold text-black">12</span> Followers
                </div>
                <div>
                  <span className="font-bold text-black">200</span> Likes
                </div>
                <div>
                  <span className="font-bold text-black">1,000 </span> Downloads
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="text-center">Posts</div>
      </div>
    </div>
  )
}

export default User
