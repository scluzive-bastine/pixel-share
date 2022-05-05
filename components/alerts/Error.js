import { BiError } from 'react-icons/bi'

const Error = ({ message }) => {
  return (
    <div className="absolute top-16 right-2 mt-4 w-[300px] rounded border border-red-400 bg-red-100 px-3 py-3 md:right-8">
      <div className="flex space-x-3">
        <BiError className="text-2xl text-red-400" />
        <div>
          <h1 className="mb-1 text-sm uppercase">Error</h1>
          <p className="text-xs text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Error
