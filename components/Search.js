import { useState } from 'react'
import { useRouter } from 'next/router'
import { AiOutlineSearch } from 'react-icons/ai'

const SearchBar = () => {
  const router = useRouter()

  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/search?q=${search}`)
    setSearch('')
  }
  return (
    <div className="mt-10 flex items-center justify-between space-x-2 rounded bg-white px-3 py-1 md:py-2">
      <AiOutlineSearch className="h-10 text-gray-600" />
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          placeholder="Search for beach, photography, art, couple, etc"
          className="w-full flex-grow text-sm font-light text-gray-600 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  )
}

export default SearchBar
