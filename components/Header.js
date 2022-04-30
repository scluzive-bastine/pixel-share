import { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import UserDropdownMenu from './UserDropdownMenu'
import UserImageComponent from './UserImageComponent'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()

  const { data: session } = useSession()
  const image = session?.session.session.user.image
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
  }
  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="flex items-center justify-between py-3 px-2 md:px-6 md:py-3">
        <div
          className="cursor-pointer font-WaterBrush text-3xl text-white"
          onClick={() => router.push('/')}
        >
          Pixel Share
        </div>
        <div className="relative">
          {session ? (
            <div className="flex items-center space-x-2">
              <UserImageComponent image={image} />
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
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
          {/* <button className="btn-ol">Login</button> */}
          {showUserMenu && (
            <UserDropdownMenu
              show={showUserMenu}
              clickOutside={() => setShowUserMenu(false)}
              session={session.session.session}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
