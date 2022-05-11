import { FaRegSadCry } from 'react-icons/fa'

const Error = ({ message }) => {
  return (
    <div className="mt-10 flex justify-center">
      <div className="w-full rounded-xl px-2 py-3 md:w-1/4">
        <div className="flex justify-center">
          <FaRegSadCry className=" text-5xl text-red-800" />
        </div>
        <div className="mt-3 text-center text-sm uppercase">{message}</div>
      </div>
    </div>
  )
}

export default Error
