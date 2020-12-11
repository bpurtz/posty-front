const initialState = {
  posts: [],
  refinedPosts: [],
  activePost: null,
  loading: false,
  error: null
}

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload
      }

    case 'UPDATE_POST':
      return {
        ...state,
        refinedPosts: [],
        posts: state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return {
              ...post,
              ...action.payload
            }
          }
          return post
        })
      }

    case 'UPDATE_ACTIVE_POST':
      return {
        ...state,
        activePost: {
          ...state.activePost,
          ...action.payload
        }
      }

    case 'REFINE_POSTS':
      // Will place all posts that match the criteria into the refinedPosts array
      return {
        ...state,
        refinedPosts: state.posts.filter((post) =>
          new RegExp(action.payload).test(post.title)
        )
      }

    case 'CLEAR_REFINED':
      return {
        ...state,
        refinedPosts: []
      }

    case 'SET_ACTIVE_POST':
      return {
        ...state,
        activePost: state.posts.find(
          (post) => post.id === parseInt(action.payload)
        )
      }

    case 'CLEAR_ACTIVE_POST':
      return {
        ...state,
        activePost: null
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default PostReducer
