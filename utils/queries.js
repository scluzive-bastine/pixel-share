export const categoriesQuery = `*[_type == "category"] {
    _id,
    name
}`

export const postsQuery = `*[_type == "post" ] | order(_createdAt desc) {
  _id,
  name,
  description,
  category -> {
   name,
   _id
  },
  likes,
  downloads,
  image{
    asset -> {
     url
    }
  },
  postedBy -> {
     _id,
    name,
    email,
    image,
    bio,
    socials
  }
}`

export const categoryPostsQuery = (categoryId) => {
  const query = `  *[_type == "post" && category._ref == '${categoryId}']{
      _id,
    name,
    description,
    category -> {
    name,
    _id
    },
    likes,
    downloads,
    image{
      asset -> {
      url
      }
    },
    postedBy -> {
      _id,
      name,
      email,
      image,
      bio,
      socials
    }
  }
`
  return query
}
