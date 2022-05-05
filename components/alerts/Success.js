import { BsCheckCircle } from 'react-icons/bs'

const Success = ({ message }) => {
  return (
    <div className="absolute top-16 right-2 mt-4 w-[300px] rounded border border-green-400 bg-green-100 px-3 py-3 md:right-8">
      <div className="flex space-x-3">
        <BsCheckCircle className="text-2xl text-green-400" />
        <div>
          <h1 className="mb-1 text-sm uppercase">Success</h1>
          <p className="text-xs text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Success
