import { useState } from 'react'
import Image from 'next/image'
import avatar from '../images/avatar.jpg'
import { MdKeyboardArrowDown } from 'react-icons/md'
const Header = () => {
  const [userMenu, setUserMenu] = useState(false)

  const toggleUserMenu = () => {
    setUserMenu(!userMenu)
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
          {userMenu && (
            <div className="absolute right-1 top-11 z-50 w-72 rounded-xl bg-white px-3 py-2 shadow-xl transition duration-150">
              <div>
                <span className="text-xs text-gray-500">Signed in </span>
                <div className="flex items-center space-x-2 rounded-lg px-2 py-3 transition duration-150 ease-in-out hover:bg-gray-100">
                  <div className="relative h-[40px] w-[40px] rounded-full border border-teal-50 hover:border-teal-100 hover:shadow-xl">
                    <Image
                      src={avatar}
                      layout="fill"
                      objectFit="cover"
                      alt="user-profile"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-black">Sabastine</div>
                    <div className="text-xs text-gray-500">
                      Sabstine@gmail.com
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xs text-gray-500">
                    Account Settings
                  </span>
                  <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-100">
                    Create a pixel
                  </div>
                  <div className="mt-4 border-t border-gray-200 pt-2">
                    <div className="cursor-pointer rounded-lg p-2 hover:bg-red-100">
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
