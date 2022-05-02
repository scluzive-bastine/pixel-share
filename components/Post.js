import UserImageComponent from '../components/UserImageComponent'
import { MdOutlineFileDownload } from 'react-icons/md'
import avatar from '../images/avatar.jpg'

const Post = ({ name, image, likes, description }) => {
  return (
    <div className="cursor-pointer">
      <div className="group relative w-full px-2 py-4">
        <div className="relative w-full rounded-2xl">
          <img
            loading="lazy"
            src={image.asset.url}
            alt={name}
            className="rounded-xl"
          />
          <div className="group-hover:bg-black-60 absolute top-0 right-0 h-full w-full rounded-xl transition duration-150 ease-in-out"></div>
        </div>
        <div className="absolute right-5 top-6 hidden rounded bg-teal-500 px-3 py-1 text-xs text-white transition duration-150 ease-in-out group-hover:inline">
          {likes} Likes
        </div>
        <div className="absolute bottom-6 left-4 hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-50 p-2 text-2xl text-teal-600 transition duration-150 ease-in-out group-hover:inline">
          <MdOutlineFileDownload />
        </div>
      </div>
      <div className="flex items-center space-x-2 px-2">
        <UserImageComponent image={avatar} />
        <div className="flex-1 overflow-hidden">
          <div className="text-sm">{name}</div>
          <p className="truncate text-xs text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Post
