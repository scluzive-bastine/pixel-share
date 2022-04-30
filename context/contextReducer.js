export const INITIAL_STATE = {
  categories: [],
  posts: [],
  user: {},
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
    default:
      return state
  }
}
