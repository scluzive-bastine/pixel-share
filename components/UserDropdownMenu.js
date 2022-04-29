import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import UserImageComponent from './UserImageComponent'

const UserDropdownMenu = ({ clickOutside, show }) => {
  const ref = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOuteSide = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        clickOutside && clickOutside()
      }
    }
    document.addEventListener('click', handleClickOuteSide, false)
    return () => {
      document.removeEventListener('click', handleClickOuteSide, true)
    }
  }, [clickOutside])

  if (!show) return null
  return (
    <div
      className="absolute right-1 top-11 z-50 w-72 rounded-xl bg-white px-3 py-2 shadow-xl transition duration-150"
      ref={ref}
    >
      <div>
        <span className="text-xs text-gray-500">Signed in </span>
        <div className="flex items-center space-x-2 rounded-lg px-2 py-3 transition duration-150 ease-in-out hover:bg-gray-100">
          <UserImageComponent width={40} height={40} />
          <div>
            <div className="font-semibold text-black">Sabastine</div>
            <div className="text-xs text-gray-500">Sabstine@gmail.com</div>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-xs text-gray-500">Account Settings</span>
          <div
            className="cursor-pointer rounded-lg p-2 hover:bg-gray-100"
            onClick={() => router.push('/create')}
          >
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
  )
}

export default UserDropdownMenu
