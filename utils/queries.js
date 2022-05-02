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
