import { createContext, useContext, useReducer } from 'react'
import { contextReducer, INITIAL_STATE } from './contextReducer'
export const PixelContext = createContext()

const AppActions = () => {
  const [state, dispatch] = useReducer(contextReducer, INITIAL_STATE)

  const getCategories = (data) => {
    dispatch({
      type: 'SET_CATEGORIES',
      payload: data,
    })
  }

  const getPosts = (data) => {
    dispatch({
      type: 'SET_POSTS',
      payload: data,
    })
  }

  const getUser = (data) => {
    dispatch({
      type: 'SET_USER',
      payload: data,
    })
  }

  return {
    state,
    getCategories,
    getPosts,
    getUser,
  }
}

const PixelProvider = ({ children }) => {
  const { state, ...props } = AppActions()

  const value = {
    categories: state.categories,
    posts: state.posts,
    user: state.user,
    ...props,
  }

  return <PixelContext.Provider value={value}>{children}</PixelContext.Provider>
}

const usePixelContext = () => {
  return useContext(PixelContext)
}

export { PixelProvider, usePixelContext }
