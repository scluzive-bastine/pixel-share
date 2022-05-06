import moment from 'moment'

export const convertDateToHumanReadable = (date) => {
  return moment(date).format('LL')
}

export const likePost = async (id, user) => {
  const response = await fetch(`/api/like-post/`, {
    method: 'POST',
    body: JSON.stringify({ id, user }),
  })
    .then((res) => window.location.reload())
    .catch((error) => console.log(error))
}

export const followUser = async (user, follower) => {
  const response = await fetch(`/api/follow-user/`, {
    method: 'POST',
    body: JSON.stringify({ user, follower }),
  })
    .then((res) => console.log(res))
    .catch((error) => console.log(error))
}

export const download = async (id) => {
  const response = await fetch(`/api/download/`, {
    method: 'POST',
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export const createComment = async (id, user, comment) => {
  const response = await fetch(`/api/create-comment/`, {
    method: 'POST',
    body: JSON.stringify({ id, user, comment }),
  })
    .then((res) => {
      return res
    })
    .catch((error) => console.log(error))
}

export const restructurePost = (posts, arr) => {
  posts.map((post) => {
    let likesCount = 0
    if (post.likes !== null) {
      likesCount += post.likes.length
    }
    arr.push({
      _id: post._id,
      name: post.name,
      description: post.description,
      image: post.image,
      likes: likesCount,
      downloads: post.downloads,
      postImage: post.postedBy.image,
    })
  })
  return arr
}
