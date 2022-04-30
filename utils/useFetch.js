import { client } from '../sanity'
import { categoriesQuery } from '../utils/queries'

const fetchCategories = async (setData) => {
  try {
    const data = await client.fetch(categoriesQuery)
    setData(data)
  } catch (error) {
    console.log(error)
  }
}

export { fetchCategories }
