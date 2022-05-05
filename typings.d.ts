export interface Post {
  _id: string
  name: string
  description: string
  _createdAt: string
  category: {
    name: string
    _id: string
  }
  image: {
    asset: {
      url: string
    }
  }
  postedBy: {
    _id: string
    slug: {
      current: string
    }
    name: string
    email: string
    image: string
    bio: string
    socials: []
    followers: []
  }
  likes: []
  downloads: []
  comments: Comment[]
}

export interface Comment {
  _id: string
  _createdAt: string
  comment: string
  user: {
    _id: string
    name: string
    image: string
  }
}
