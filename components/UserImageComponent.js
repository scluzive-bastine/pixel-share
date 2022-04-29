import Image from 'next/image'
import avatar from '../images/avatar.jpg'

const UserImageComponent = ({ height, width }) => {
  return (
    <div
      className={`trnasition relative h-[${height}px] w-[${width}px] rounded-full border border-teal-50 duration-150 ease-in-out hover:border-teal-100 hover:shadow-xl`}
    >
      <Image
        src={avatar}
        layout="fill"
        objectFit="cover"
        alt="user-profile"
        className="rounded-full"
      />
    </div>
  )
}

export default UserImageComponent
