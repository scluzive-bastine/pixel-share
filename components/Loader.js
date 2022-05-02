import { Bars } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className="flex justify-center">
      <Bars
        heigth="50"
        width="50"
        color="#3b82f6"
        ariaLabel="loading-indicator"
      />
    </div>
  )
}

export default Loader
