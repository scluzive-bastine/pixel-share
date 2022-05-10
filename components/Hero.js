import UserImageComponent from './UserImageComponent'
import avatar from '../images/avatar.jpg'
import SearchBar from './Search'
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
      <SearchBar />
      <div className="mt-10">
        <div className="text-center text-gray-200">Trending Users</div>
        <div className="flex items-center justify-center space-x-2 py-3 md:space-x-4">
          <UserImageComponent image={avatar} />
          <UserImageComponent image={avatar} />
          <UserImageComponent image={avatar} />
          <UserImageComponent image={avatar} />
        </div>
      </div>
    </div>
  )
}

export default Hero
