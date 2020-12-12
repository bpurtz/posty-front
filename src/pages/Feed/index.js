import { connect } from 'react-redux'
import FeedDisplay from './FeedDisplay'

const mapStateToProps = (state) => ({
  posts: state.postState.posts,
  refinedPosts: state.postState.refinedPosts
})

export default connect(mapStateToProps)(FeedDisplay)
