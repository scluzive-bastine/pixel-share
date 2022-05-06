import Masonry from 'react-masonry-css'
import Post from './Post'

const breakpointsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
}

const Content = ({ posts }) => {
  return (
    <Masonry className="flex" breakpointCols={breakpointsObj}>
      {posts.map((post) => (
        <Post
          key={post._id}
          name={post.name}
          description={post.description}
          likes={post.likes}
          image={post.image}
          id={post._id}
        />
      ))}
    </Masonry>
  )
}

export default Content
