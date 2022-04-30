import Image from 'next/image'
import avatar from '../images/avatar.jpg'

const UserImageComponent = ({ image }) => {
  return (
    <div
      className={`trnasition relative h-[40px] w-[40px] rounded-full border border-teal-50 duration-150 ease-in-out hover:border-teal-100 hover:shadow-xl`}
    >
      <Image
        src={image}
        layout="fill"
        objectFit="cover"
        alt="user-profile"
        className="rounded-full"
      />
    </div>
  )
}

export default UserImageComponent
