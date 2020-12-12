import { connect } from 'react-redux'
import PostDisplay from './PostDisplay'

const mapStateToProps = (state) => ({
  post: state.postState.activePost,
  posts: state.postState.posts,
  potentialPosts: state.postState.refinedPosts
})

export default connect(mapStateToProps)(PostDisplay)
