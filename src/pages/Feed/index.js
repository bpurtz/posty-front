import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles, TextField } from '@material-ui/core'
import styles from './styles'
import HeaderBar from '../../components/HeaderBar'
import PaginateArrows from '../../components/PaginateArrows'
import PostCard from '../../components/PostCard'
import action from '../../redux/action'
import { CLEAR_REFINED_POSTS, SEARCH_POSTS } from '../../redux/types'

const postLimit = 10

const Feed = ({ classes, postState }) => {
  // Used for pagination
  const [offset, setOffset] = useState(0)
  // Used for displaying either the searched posts or all posts
  const [activePosts, setActivePosts] = useState([])

  const handleSearchChange = (e) => {
    if (e.target.value.trim() === '') {
      action(CLEAR_REFINED_POSTS)
    } else {
      action(SEARCH_POSTS, e.target.value)
    }
  }

  // Will react to changes in the postState and determine which posts to show
  useEffect(() => {
    // If there are no refinedPosts, then we know to show all posts
    if (postState.refinedPosts.length === 0) {
      setActivePosts(postState.posts)
    } else {
      setActivePosts(postState.refinedPosts)
    }
  }, [postState, postState.posts, postState.refinedPosts, setActivePosts])

  return (
    <div className={classes.content_wrap}>
      <HeaderBar title='Feed' />
      <TextField
        placeholder='Search By Title'
        onChange={handleSearchChange}
        className={classes.search_field}
      />
      <PaginateArrows
        forwardDisabled={offset + postLimit >= activePosts.length}
        step={postLimit}
        setOffset={setOffset}
      />
      <div className={classes.post_feed}>
        {activePosts.slice(offset, offset + postLimit).map((post, i) => (
          <PostCard post={post} key={i} />
        ))}
      </div>
    </div>
  )
}

Feed.propTypes = {
  classes: PropTypes.object,
  postState: PropTypes.object,
  location: PropTypes.object
}

const mapStateToProps = (state) => ({
  postState: state.postState
})

export default withStyles(styles)(connect(mapStateToProps)(Feed))
