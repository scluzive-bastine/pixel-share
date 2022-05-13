import { useState } from 'react'
import avatar from '../images/avatar.jpg'
import UserImageComponent from './UserImageComponent'
import { createComment, convertDateToHumanReadable } from '../utils/functions'
import Error from './alerts/Error'
import Success from './alerts/Success'
import { useSession } from 'next-auth/react'

const Comment = ({ id, user, comments }) => {
  const [comment, setComment] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { data: session } = useSession()

  const details = {
    id,
    user,
    comment,
  }
  const handleCreateComment = async () => {
    if (comment) {
      setLoading(false)
      const response = await fetch(`/api/create-comment/`, {
        method: 'POST',
        body: JSON.stringify(details),
      })
        .then((res) => {
          setComment('')
          setSubmitted(true)
          setTimeout(() => {
            setSubmitted(false)
          }, 10000)
        })
        .catch((error) => console.log(error))
    } else {
      seterror(true)
      setTimeout(() => setError(false), 10000)
    }
    setLoading(false)
  }

  return (
    <div className="mt-5 w-full">
      <div className="border-b border-gray-200 pb-2">
        <h1 className="text-lg text-gray-700">Comments</h1>
      </div>
      {session ? (
        <div className="mt-4 flex space-x-4">
          <UserImageComponent
            className="w-1/5"
            image={session?.session.session.user.image}
          />
          <div className="w-4/5 flex-grow">
            <textarea
              type="text"
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="inline-block w-full rounded border border-gray-300 px-2
            py-1 align-top text-sm text-gray-700 outline-none transition duration-150 ease-in-out focus:border-gray-400"
            ></textarea>
            <button
              className={`float-right mt-2 rounded ${
                comment
                  ? 'bg-teal-600 text-white hover:bg-teal-700 '
                  : 'bg-gray-300 text-black'
              } px-4 py-2 text-sm transition duration-150 ease-in-out `}
              disabled={!comment}
              onClick={handleCreateComment}
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </div>
      ) : null}
      {comments.length > 0 && (
        <div className="mt-5 h-[500px] overflow-y-scroll rounded px-2 py-4">
          {comments?.map(
            ({ _id, comment, user: { name, image }, _createdAt }) => (
              <div
                className="mb-3 flex space-x-4 border-b border-gray-200 pb-4 last:border-0"
                key={_id}
              >
                <UserImageComponent className="w-1/5" image={image} />
                <div className="w-4/5">
                  <div className="flex items-center space-x-2">
                    <h1>{name}</h1>
                    <span className="text-sm text-gray-500">
                      {convertDateToHumanReadable(_createdAt)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{comment}</p>
                </div>
              </div>
            )
          )}
        </div>
      )}
      {submitted && <Success message="Comment created!" />}
      {error && <Error message="Fill the form" />}
    </div>
  )
}

export default Comment
