export const categoriesQuery = `*[_type == "category"] {
    _id,
    name
}`

export const postsQuery = `*[_type == "post" ] | order(_createdAt desc) {
        _id,
        name,
        description,
        _createdAt,
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
            slug,
            name,
            email,
            image,
            bio,
            socials,
            followers
        },
        likes,
        downloads,
        "comments": *[_type == 'comment' && references(^._id)] {
          _id,
          _createdAt,
          comment,
          user -> {
            _id,
            name,
            image
          }
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

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "post" && name match '${searchTerm}*' || description match '${searchTerm}*' || category->name match '${searchTerm}*']{
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
  return query
}
