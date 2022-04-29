import { AiOutlineSearch } from 'react-icons/ai'
import UserImageComponent from './UserImageComponent'
const Hero = () => {
  return (
    <div className="mx-auto mt-10 max-w-screen-md px-3 lg:px-0">
      <div className="text-center">
        <h1 className="text-3xl font-medium text-white md:text-5xl">
          Best Moments are Shared with Family and Friends
        </h1>
        <p className="mt-5 text-sm text-gray-200">
          Share, Download, Like, Follow - Be Awesome :)
        </p>
      </div>
      <div className="mt-10 flex items-center justify-between space-x-2 rounded bg-white px-3 py-1 md:py-2">
        <AiOutlineSearch className="h-10 text-gray-600" />
        <input
          type="text"
          placeholder="Search for beach, photography, art, couple, etc"
          className="flex-grow text-sm font-light text-gray-600 outline-none"
        />
      </div>
      <div className="mt-10">
        <div className="text-center text-gray-200">Trending Users</div>
        <div className="flex items-center justify-center space-x-2 py-3 md:space-x-4">
          <UserImageComponent />
          <UserImageComponent />
          <UserImageComponent />
          <UserImageComponent />
        </div>
      </div>
    </div>
  )
}

export default Hero
