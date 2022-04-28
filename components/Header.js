import { useState } from 'react'
import Image from 'next/image'
import avatar from '../images/avatar.jpg'
import { MdKeyboardArrowDown } from 'react-icons/md'
import UserDropdownMenu from './UserDropdownMenu'
const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
  }
  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="flex items-center justify-between py-3 px-2 md:py-6">
        <div className="font-WaterBrush text-3xl text-white">Pixel Share</div>
        <div className="relative">
          <div className="flex items-center space-x-2">
            <div className="relative h-[40px] w-[40px] rounded-full border border-teal-50 hover:border-teal-100 hover:shadow-xl">
              <Image
                src={avatar}
                layout="fill"
                objectFit="cover"
                alt="user-profile"
                className="rounded-full"
              />
            </div>
            <div
              className="cursor-pointer rounded-full p-2 text-white outline-none transition duration-150 ease-in-out hover:bg-gray-100 hover:text-teal-500 md:hidden"
              onClick={toggleUserMenu}
            >
              <MdKeyboardArrowDown className="text-2xl" />
            </div>
            <div
              className="hidden cursor-pointer text-lg font-semibold text-white outline-none hover:underline md:inline"
              onClick={toggleUserMenu}
            >
              Sabastine
            </div>
          </div>
          {/* <button className="btn-ol">Login</button> */}
          {showUserMenu && (
            <UserDropdownMenu
              show={showUserMenu}
              clickOutside={() => setShowUserMenu(false)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Header