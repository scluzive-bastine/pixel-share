export const INITIAL_STATE = {
  categories: [],
  posts: [],
  user: {},
  likes: '',
  followers: '',
}

export const contextReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      }
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'SET_LIKES':
      return {
        ...state,
        likes: action.payload,
      }
    default:
      return state
  }
}
