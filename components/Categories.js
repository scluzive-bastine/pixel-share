import { usePixelContext } from '../context/context'
import { useState, useEffect, useRef } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useRouter } from 'next/router'

const Categories = () => {
  const { categories } = usePixelContext()

  const maxScrollWidth = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carousel = useRef(null)
  const [finished, setFinished] = useState(false)

  const router = useRouter()

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
      setFinished(false)
    }
  }

  const moveNext = () => {
    if (carousel.current !== null && currentIndex !== 2) {
      setCurrentIndex((prevState) => prevState + 1)
    }
    if (carousel.current.offsetWidth * currentIndex > maxScrollWidth.current) {
      setFinished(true)
    }
  }

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex
    }
  }, [currentIndex])

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0
  }, [])

  return (
    <div className="container relative flex items-center justify-center">
      {categories.length > 0 && (
        <>
          <div
            className={`absolute top-0 left-0 z-10 h-10 w-5 bg-gradient-to-r from-[#f3f4f6] ${
              currentIndex <= 0 ? 'hidden' : 'flex'
            }`}
          />
          <div
            className={`slider-btn absolute left-4 md:-left-2 ${
              currentIndex <= 0 ? 'hidden' : 'flex'
            }`}
            onClick={movePrev}
          >
            <MdKeyboardArrowLeft className="text-2xl" />
          </div>
          <div
            ref={carousel}
            className="carousel-container relative z-0 flex touch-pan-x snap-x snap-mandatory gap-1 space-x-2 overflow-hidden scroll-smooth px-8 md:space-x-6 md:px-0"
          >
            {categories.map((category, i) => (
              <div
                key={i}
                onClick={() => router.push(`/category/${category._id}`)}
                className={`cursor-pointer snap-start whitespace-nowrap rounded-full border border-teal-600 px-6 py-2 text-center text-sm font-semibold capitalize transition duration-150 ease-in-out hover:bg-teal-500 hover:text-white ${
                  router.query.id === category._id && 'bg-teal-500 text-white'
                }`}
              >
                {category.name}
              </div>
            ))}
          </div>
          <button
            onClick={moveNext}
            className={`slider-btn absolute right-4 md:-right-2 ${
              finished ? 'hidden' : 'flex'
            }`}
          >
            <MdKeyboardArrowRight className="text-lg" />
          </button>
          <div
            className={`absolute top-0 right-0 z-10 h-10 w-5 bg-gradient-to-l from-[#f3f4f6] ${
              finished ? 'hidden' : 'flex'
            }`}
          />
        </>
      )}
    </div>
  )
}

export default Categories
