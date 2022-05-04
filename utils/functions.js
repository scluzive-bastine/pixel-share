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
