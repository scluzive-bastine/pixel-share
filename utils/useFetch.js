import { client } from '../sanity'
import { categoriesQuery, postsQuery } from '../utils/queries'

const fetchCategories = async (setData) => {
  try {
    const data = await client.fetch(categoriesQuery)
    setData(data)
  } catch (error) {
    console.log(error)
  }
}

const fetchPosts = async (setLoading, setError, setData) => {
  setLoading(true)
  try {
    const data = await client.fetch(postsQuery)
    setData(data)
    setLoading(false)
  } catch (error) {
    setError(error)
  }
}

export { fetchCategories, fetchPosts }
