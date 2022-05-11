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

export interface User {
  _id: string
  name: string
  bio: string
  location: string
  followers: []
  image: string
  instagram: string
  twitter: string
  posts: {
    map(arg0: (post: any) => void)
    _id: string
    name: string
    description: string
    downloads: []
    likes: []
    image: {
      asset: {
        url: string
      }
    }
  }
}

export interface SinglePost {
  downloads: []
  _id: string
  name: string
  description: string
  image: string
  likes: any
}
