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

const fetchUser = async (id, setData) => {
  const query = `*[_type == "user" && _id == '${id}'] {
      name,
      email,
      image,
      bio,
      social {
        twitter,
        instagram,
      },
    }`
  try {
    const data = await client.fetch(query)
    setData(data)
  } catch (error) {
    console.log(error)
  }
}

export { fetchCategories, fetchPosts, fetchUser }
